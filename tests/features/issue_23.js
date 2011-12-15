/**
 *  Features@head(request, socket, head)
 *
 *  Emitted each time a client requests a http upgrade. If this
 *  event isn't listened for, then clients requesting an upgrade
 *  will have their connections closed.
 *
 *  - *request* is the arguments for the http request, as it is in
 *    the request event.
 *  - *socket* is the network socket between the server and client.
 *  - *head* is an instance of Buffer, the first packet of the
 *    upgraded stream, this may be empty.
 *
 *  After this event is emitted, the request's socket will not have a
 *  data event listener, meaning you will need to bind to it in order
 *  to handle data sent to the server on that socket.
 **/
