from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import  String, Column, Integer, DATE, DateTime
import datetime
import sys

DATABASE = 'mysql'
DIRVE = 'pymysql'
USER = 'root'
PASSWORD = '1234'
HOST = '127.0.0.1'
PORT = '3306'
DB = 'itme'

SQLALCHEMY_DATABASE_URI = '{}+{}://{}:{}@{}:{}/{}?charset=utf8'.format(DATABASE, DIRVE, USER, PASSWORD, HOST, PORT, DB)
engine = create_engine(SQLALCHEMY_DATABASE_URI)
Base = declarative_base()
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

def current_date():
    return datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

class Image(Base):
    __tablename__ = "it_image"
    image_id = Column(Integer, primary_key=True, autoincrement=True)
    image_url = Column(String(200), nullable=False, unique=True)
    create_date = Column(DateTime, nullable=False)
    update_date = Column(DateTime, nullable=False)
    def __repr__(self):
        return "<Image>{}:{}".format(self.image_url, self.image_id)

class Db(object):
    def __init__(self):
        self.session = Session()

    # def decorator(func):
    #     def wrapper(*args, **kwargs):
    #         args_lst = map(lambda kw: "{}='{}'".format(kw[0], kw[1]), kwargs.iteritems())
    #         return func(args[1](", ".join(args_lst)))
    #     return wrapper
    # @decorator
    def insert(self, data):
        self.session.add(data)

    def insert_batch(self, datas):
        self.session.add_all(datas)

    def query(self, table, image_id):
        # where = []
        # for key, value in kwargs.iteritems():
        #     where.append([key, value])
        return self.session.query(table).get(image_id)

    def queryAll(self, table):
        # where = []
        # for key, value in kwargs.iteritems():
        #     where.append([key, value])
        return self.session.query(table).all()

    def __del__(self):
        self.session.commit()
        self.session.close()
if __name__ == "__main__":
    db = Db()
    # image = Image(image_url='ssssss', create_date=current_date(), update_date=current_date())
    # db.insert(image)

    for aa in db.queryAll(Image):
        print aa.image_url





















