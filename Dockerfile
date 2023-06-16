# cceh/kosh_client
FROM alpine:3.17
EXPOSE 80
ADD . /tmp/kosh_client
RUN \
#
# packages
apk --no-cache add \
  busybox-extras && \
apk --no-cache --virtual build add \
  npm && \
#
# kosh_client
npm --prefix /tmp/kosh_client install && \
npm --prefix /tmp/kosh_client run build && \
mv /tmp/kosh_client/build /opt/kosh_client && \
#
# cleanup
apk del --purge build && \
find /root /tmp -mindepth 1 -delete
#
# runtime
CMD ["/usr/sbin/httpd", "-fh", "/opt/kosh_client"]
