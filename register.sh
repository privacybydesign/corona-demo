#!/bin/sh

docker image tag covid-19-test-issuer registry.procolix.com/covid-19-test-issuer

docker image push registry.procolix.com/covid-19-test-issuer
