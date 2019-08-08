# This should be run from parent folder, to give full project context
FROM golang:1.10.3 as builder
WORKDIR /go/src/fogflow/
COPY . .
WORKDIR /go/src/fogflow/master
RUN go get
RUN CGO_ENABLED=0 go build -a

FROM scratch
COPY --from=builder /go/src/fogflow/master/master ./
#ADD config.json /
CMD ["/master"]
