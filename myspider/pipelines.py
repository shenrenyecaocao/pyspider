# -*- coding: utf-8 -*-
import json
import os

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