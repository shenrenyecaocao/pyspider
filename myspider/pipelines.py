# -*- coding: utf-8 -*-
from scrapy.exceptions import DropItem
import codecs
import os
import json
import execjs

class MyspiderPipeline(object):
    def process_item(self, item, spider):
        return item

class FilterWordsPipeline(object):
    """A pipeline for filtering out items which contain certain words in their
    description"""

    # put all words in lowercase
    words_to_filter = ['politics', 'religion']

    def process_item(self, item, spider):
        for word in self.words_to_filter:
            if word in item['description'].lower():
                raise DropItem("Contains forbidden word: %s" % word)
        else:
            return item

class JiandanspiderPipeline(object):
    def open_spider(self, spider):
        self.image_hash = []
        self.js = []
        self.function = 'jd9DgSXGMwCNDnfTjI62MY3uasZNUVxUOG'
        self.key = 'opterjpTI6TWsPoHREIveRghj6OE0Jgp'
        filepath = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'data', 'info.txt')
        self.f = open(filepath, 'wb')

    def process_item(self, item, spider):
        line = json.dumps(dict(item)) + "\n"
        self.image_hash = item['image_hash']
        self.js.append(item['js'])
        self.f.write(line)
        return item

    def write_to_file(self, info, filename):
        filepath = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'data', filename)
        with open(filepath, 'wb') as f:
            if isinstance(info, str):
                f.write(info)
            elif isinstance(info, list):
                info = map(lambda x: "%s\n" % x.strip(), info)
                f.write("".join(info).encode('utf-8'))

    def close_spider(self, spider):
        jsstr = "\n".join(self.js[0:2])
        self.write_to_file(jsstr, "js_info.js")
        ctx = execjs.compile(jsstr)
        print("%%%%%%%%%%%%")
        print "111111111111111"
        for imag_hash in self.image_hash:
            print(ctx.call(self.function, imag_hash, self.key))
        print("$$$$$$$$$$$$")
        self.f.close()

class FinancialspiderPipeline(object):
    def __init__(self):
        self.file = codecs.open('financial_file1', mode='ab', encoding='utf-8')

    def process_item(self, item, spider):
        content = item['html_content']
        #self.file.write(content.decode("unicode_escape"))
        self.file.write(content)
        return item