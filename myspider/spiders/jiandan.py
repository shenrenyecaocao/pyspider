# -*- coding: utf-8 -*-

import scrapy
from scrapy.http import Request
import codecs
import sys, os
import hashlib
import base64
from myspider.items import JiandanspiderItem

class JiandanSpider(scrapy.Spider):
    name = 'jiandan'
    # allowed_domains = ['http://jandan.net']
    start_urls = ['http://jandan.net/ooxx']

    def parse(self, response):
        image_hash = response.xpath('//ol[@class="commentlist"]//span[@class="img-hash"]/text()').extract()
        for _hash in image_hash:
            img_url = self.decrypt_fun(img_hash=_hash)
            yield Request(img_url, callback=self.download_img)
        next_page = response.xpath("//div[@class='cp-pagenavi']//a[@class='previous-comment-page']/@href").extract_first()
        if next_page is not None:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse)

    def download_img(self, response):
        item = JiandanspiderItem()
        img_file = response.url.split('/')[-1:][0]
        img_content = response.body
        img_path = "image/" + img_file
        self.encode_to_write(img_content, img_path)
        item['img_file'] = img_file
        item['img_url'] = response.url
        return item

    def encode_to_write(self, info, filename):
        filepath = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../', 'data', filename)
        with codecs.open(filepath, 'wb') as f:
            if isinstance(info, str):
                f.write(info)
            elif isinstance(info, list):
                info = map(lambda x: "%s\n" % x.strip(), info)
                f.write("".join(info).encode('utf-8'))

    def decrypt_fun(self, img_hash):
        def _md5(value):
            m = hashlib.md5()
            m.update(value.encode('utf-8'))
            return m.hexdigest()

        def _base64_decode(data):
            missing_padding = 4 - len(data) % 4
            if missing_padding:
                data += '=' * missing_padding
            return base64.b64decode(data)

        def get_imgurl(m, r=''):
            q = 4
            m = m[q:]
            k = _base64_decode(m)
            return "http://w" + k
        return get_imgurl(img_hash)


if __name__ == '__main__':
    pass