FROM ubuntu:16.04

#Install all the languages/compilers we are supporting.
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y g++
RUN apt-get install -y python3
RUN apt-get install -y python3-pip
RUN apt-get install -y python
RUN apt-get install -y python-pip

RUN pip3 install pymongo
