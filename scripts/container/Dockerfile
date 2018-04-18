FROM ubuntu:16.04

# Install all the languages/compilers we are supporting.

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y g++
RUN apt-get install -y python3
RUN apt-get install -y python3-pip
RUN apt-get install -y python
RUN apt-get install -y python-pip
RUN apt-get install -y openjdk-8-jdk-headless

# Install pymongo in order to write results to DB
RUN pip3 install pymongo

# Compile test framework for C++
RUN mkdir /test-cpp
COPY catch.hpp /test-cpp/catch.hpp
COPY test-main.cpp /test-cpp/test-main.cpp
RUN g++ --std=c++14 /test-cpp/test-main.cpp -I/test -c -o /test-cpp/test-main.o
