# -*- coding: utf-8 -*-
import json
import os
from lib.db import *

class JiandanspiderPipeline1(object):
    def open_spider(self, spider):
        self.db = Db()
        self.image_urls = []
        for image_url in self.db.queryAll(Image):
            self.image_urls.append(image_url.image_url)
        filepath = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'data', "crawl_img_recrod.txt")
        self.f = open(filepath, "w")
        self.image_data = []

    def process_item(self, item, spider):
        img_url = item.get('img_url')
        if img_url not in self.image_urls:
            image = Image(image_url=img_url, create_date=current_date(), update_date=current_date())
            self.image_data.append(image)
        self.f.write("image_url: %s\n" % img_url)
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
        self.db.insert_batch(self.image_data)
        self.f.close()

class JiandanspiderPipeline(object):
    def open_spider(self, spider):
        filepath = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'data', "crawl_img_recrod.txt")
        self.f = open(filepath, "w")

    def process_item(self, item, spider):
        self.f.write(json.dumps(dict(item)) + "\n")
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
        self.f.close()