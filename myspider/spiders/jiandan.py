# -*- coding: utf-8 -*-

import scrapy
from scrapy.http import Request
import codecs
import sys, os
import json
import re
from myspider.items import JiandanspiderItem

class JiandanSpider(scrapy.Spider):
    name = 'jiandan'
    # allowed_domains = ['http://jandan.net']
    start_urls = ['http://jandan.net/ooxx']

    def parse(self, response):
        item = JiandanspiderItem()
        image_hash = response.xpath('//ol[@class="commentlist"]//span[@class="img-hash"]/text()').extract()
        js_url = response.xpath("//script/@src").extract()
        js_url = filter(lambda x: x.find('.js') >= 0, js_url)
        js_url = map(lambda x: "http:%s" % x, js_url)
        for js in js_url:
            yield Request(js, meta={'image_hash': image_hash}, callback=self.parse_js)

    def parse_js(self, response):
        image_hash = response.meta['image_hash']
        content = response.body
        return {"js": content, "image_hash": image_hash}

    def encode_to_write(self, info, filename):
        filepath = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../', 'data', filename)
        with codecs.open(filepath, 'wb') as f:
            if isinstance(info, str):
                f.write(info)
            elif isinstance(info, list):
                info = map(lambda x: "%s\n" % x.strip(), info)
                f.write("".join(info).encode('utf-8'))

    def decrypt_fun(self, img_hash):
        return img_hash


if __name__ == '__main__':
    pass