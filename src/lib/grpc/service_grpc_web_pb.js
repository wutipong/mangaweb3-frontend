/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v3.14.0
// source: service.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')

var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js')
const proto = require('./service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.MetaServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.MetaServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.MetaListRequest,
 *   !proto.MetaListResponse>}
 */
const methodDescriptor_MetaService_List = new grpc.web.MethodDescriptor(
  '/MetaService/List',
  grpc.web.MethodType.UNARY,
  proto.MetaListRequest,
  proto.MetaListResponse,
  /**
   * @param {!proto.MetaListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.MetaListResponse.deserializeBinary
);


/**
 * @param {!proto.MetaListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.MetaListResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.MetaListResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.MetaServiceClient.prototype.list =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/MetaService/List',
      request,
      metadata || {},
      methodDescriptor_MetaService_List,
      callback);
};


/**
 * @param {!proto.MetaListRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.MetaListResponse>}
 *     Promise that resolves to the response
 */
proto.MetaServicePromiseClient.prototype.list =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/MetaService/List',
      request,
      metadata || {},
      methodDescriptor_MetaService_List);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.MetaGetRequest,
 *   !proto.MetaGetResponse>}
 */
const methodDescriptor_MetaService_Get = new grpc.web.MethodDescriptor(
  '/MetaService/Get',
  grpc.web.MethodType.UNARY,
  proto.MetaGetRequest,
  proto.MetaGetResponse,
  /**
   * @param {!proto.MetaGetRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.MetaGetResponse.deserializeBinary
);


/**
 * @param {!proto.MetaGetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.MetaGetResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.MetaGetResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.MetaServiceClient.prototype.get =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/MetaService/Get',
      request,
      metadata || {},
      methodDescriptor_MetaService_Get,
      callback);
};


/**
 * @param {!proto.MetaGetRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.MetaGetResponse>}
 *     Promise that resolves to the response
 */
proto.MetaServicePromiseClient.prototype.get =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/MetaService/Get',
      request,
      metadata || {},
      methodDescriptor_MetaService_Get);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.SetFavoriteRequest,
 *   !proto.SetFavoriteResponse>}
 */
const methodDescriptor_MetaService_SetFavorite = new grpc.web.MethodDescriptor(
  '/MetaService/SetFavorite',
  grpc.web.MethodType.UNARY,
  proto.SetFavoriteRequest,
  proto.SetFavoriteResponse,
  /**
   * @param {!proto.SetFavoriteRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.SetFavoriteResponse.deserializeBinary
);


/**
 * @param {!proto.SetFavoriteRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.SetFavoriteResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.SetFavoriteResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.MetaServiceClient.prototype.setFavorite =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/MetaService/SetFavorite',
      request,
      metadata || {},
      methodDescriptor_MetaService_SetFavorite,
      callback);
};


/**
 * @param {!proto.SetFavoriteRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.SetFavoriteResponse>}
 *     Promise that resolves to the response
 */
proto.MetaServicePromiseClient.prototype.setFavorite =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/MetaService/SetFavorite',
      request,
      metadata || {},
      methodDescriptor_MetaService_SetFavorite);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.GetPageRequest,
 *   !proto.GetPageResponse>}
 */
const methodDescriptor_MetaService_GetPage = new grpc.web.MethodDescriptor(
  '/MetaService/GetPage',
  grpc.web.MethodType.UNARY,
  proto.GetPageRequest,
  proto.GetPageResponse,
  /**
   * @param {!proto.GetPageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.GetPageResponse.deserializeBinary
);


/**
 * @param {!proto.GetPageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.GetPageResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.GetPageResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.MetaServiceClient.prototype.getPage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/MetaService/GetPage',
      request,
      metadata || {},
      methodDescriptor_MetaService_GetPage,
      callback);
};


/**
 * @param {!proto.GetPageRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.GetPageResponse>}
 *     Promise that resolves to the response
 */
proto.MetaServicePromiseClient.prototype.getPage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/MetaService/GetPage',
      request,
      metadata || {},
      methodDescriptor_MetaService_GetPage);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.TagServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.TagServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.TagListRequest,
 *   !proto.TagListResponse>}
 */
const methodDescriptor_TagService_List = new grpc.web.MethodDescriptor(
  '/TagService/List',
  grpc.web.MethodType.UNARY,
  proto.TagListRequest,
  proto.TagListResponse,
  /**
   * @param {!proto.TagListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TagListResponse.deserializeBinary
);


/**
 * @param {!proto.TagListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.TagListResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.TagListResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.TagServiceClient.prototype.list =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/TagService/List',
      request,
      metadata || {},
      methodDescriptor_TagService_List,
      callback);
};


/**
 * @param {!proto.TagListRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.TagListResponse>}
 *     Promise that resolves to the response
 */
proto.TagServicePromiseClient.prototype.list =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/TagService/List',
      request,
      metadata || {},
      methodDescriptor_TagService_List);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.SetFavoriteRequest,
 *   !proto.SetFavoriteResponse>}
 */
const methodDescriptor_TagService_SetFavorite = new grpc.web.MethodDescriptor(
  '/TagService/SetFavorite',
  grpc.web.MethodType.UNARY,
  proto.SetFavoriteRequest,
  proto.SetFavoriteResponse,
  /**
   * @param {!proto.SetFavoriteRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.SetFavoriteResponse.deserializeBinary
);


/**
 * @param {!proto.SetFavoriteRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.SetFavoriteResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.SetFavoriteResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.TagServiceClient.prototype.setFavorite =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/TagService/SetFavorite',
      request,
      metadata || {},
      methodDescriptor_TagService_SetFavorite,
      callback);
};


/**
 * @param {!proto.SetFavoriteRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.SetFavoriteResponse>}
 *     Promise that resolves to the response
 */
proto.TagServicePromiseClient.prototype.setFavorite =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/TagService/SetFavorite',
      request,
      metadata || {},
      methodDescriptor_TagService_SetFavorite);
};


module.exports = proto;

