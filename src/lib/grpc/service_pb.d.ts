import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';
import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb';


export class Meta extends jspb.Message {
  getId(): number;
  setId(value: number): Meta;

  getName(): string;
  setName(value: string): Meta;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): Meta;
  hasCreateTime(): boolean;
  clearCreateTime(): Meta;

  getFavorite(): boolean;
  setFavorite(value: boolean): Meta;

  getThumbnail(): google_protobuf_wrappers_pb.BytesValue | undefined;
  setThumbnail(value?: google_protobuf_wrappers_pb.BytesValue): Meta;
  hasThumbnail(): boolean;
  clearThumbnail(): Meta;

  getRead(): boolean;
  setRead(value: boolean): Meta;

  getActive(): boolean;
  setActive(value: boolean): Meta;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Meta.AsObject;
  static toObject(includeInstance: boolean, msg: Meta): Meta.AsObject;
  static serializeBinaryToWriter(message: Meta, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Meta;
  static deserializeBinaryFromReader(message: Meta, reader: jspb.BinaryReader): Meta;
}

export namespace Meta {
  export type AsObject = {
    id: number,
    name: string,
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    favorite: boolean,
    thumbnail?: google_protobuf_wrappers_pb.BytesValue.AsObject,
    read: boolean,
    active: boolean,
  }
}

export class Tag extends jspb.Message {
  getId(): number;
  setId(value: number): Tag;

  getName(): string;
  setName(value: string): Tag;

  getFavorite(): boolean;
  setFavorite(value: boolean): Tag;

  getHidden(): boolean;
  setHidden(value: boolean): Tag;

  getThumbnail(): google_protobuf_wrappers_pb.BytesValue | undefined;
  setThumbnail(value?: google_protobuf_wrappers_pb.BytesValue): Tag;
  hasThumbnail(): boolean;
  clearThumbnail(): Tag;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Tag.AsObject;
  static toObject(includeInstance: boolean, msg: Tag): Tag.AsObject;
  static serializeBinaryToWriter(message: Tag, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Tag;
  static deserializeBinaryFromReader(message: Tag, reader: jspb.BinaryReader): Tag;
}

export namespace Tag {
  export type AsObject = {
    id: number,
    name: string,
    favorite: boolean,
    hidden: boolean,
    thumbnail?: google_protobuf_wrappers_pb.BytesValue.AsObject,
  }
}

export class MetaListRequest extends jspb.Message {
  getTag(): string;
  setTag(value: string): MetaListRequest;

  getFavoriteOnly(): boolean;
  setFavoriteOnly(value: boolean): MetaListRequest;

  getPage(): number;
  setPage(value: number): MetaListRequest;

  getItemPerPage(): number;
  setItemPerPage(value: number): MetaListRequest;

  getSearch(): string;
  setSearch(value: string): MetaListRequest;

  getSort(): SORT_BY;
  setSort(value: SORT_BY): MetaListRequest;

  getOrder(): ORDER;
  setOrder(value: ORDER): MetaListRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MetaListRequest): MetaListRequest.AsObject;
  static serializeBinaryToWriter(message: MetaListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaListRequest;
  static deserializeBinaryFromReader(message: MetaListRequest, reader: jspb.BinaryReader): MetaListRequest;
}

export namespace MetaListRequest {
  export type AsObject = {
    tag: string,
    favoriteOnly: boolean,
    page: number,
    itemPerPage: number,
    search: string,
    sort: SORT_BY,
    order: ORDER,
  }
}

export class MetaListResponse extends jspb.Message {
  getTagFavorite(): boolean;
  setTagFavorite(value: boolean): MetaListResponse;

  getTotalPage(): number;
  setTotalPage(value: number): MetaListResponse;

  getItemsList(): Array<Meta>;
  setItemsList(value: Array<Meta>): MetaListResponse;
  clearItemsList(): MetaListResponse;
  addItems(value?: Meta, index?: number): Meta;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MetaListResponse): MetaListResponse.AsObject;
  static serializeBinaryToWriter(message: MetaListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaListResponse;
  static deserializeBinaryFromReader(message: MetaListResponse, reader: jspb.BinaryReader): MetaListResponse;
}

export namespace MetaListResponse {
  export type AsObject = {
    tagFavorite: boolean,
    totalPage: number,
    itemsList: Array<Meta.AsObject>,
  }
}

export class MetaGetRequest extends jspb.Message {
  getId(): number;
  setId(value: number): MetaGetRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaGetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MetaGetRequest): MetaGetRequest.AsObject;
  static serializeBinaryToWriter(message: MetaGetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaGetRequest;
  static deserializeBinaryFromReader(message: MetaGetRequest, reader: jspb.BinaryReader): MetaGetRequest;
}

export namespace MetaGetRequest {
  export type AsObject = {
    id: number,
  }
}

export class MetaGetResponse extends jspb.Message {
  getItem(): Meta | undefined;
  setItem(value?: Meta): MetaGetResponse;
  hasItem(): boolean;
  clearItem(): MetaGetResponse;

  getPageCount(): number;
  setPageCount(value: number): MetaGetResponse;

  getTagsList(): Array<Tag>;
  setTagsList(value: Array<Tag>): MetaGetResponse;
  clearTagsList(): MetaGetResponse;
  addTags(value?: Tag, index?: number): Tag;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaGetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MetaGetResponse): MetaGetResponse.AsObject;
  static serializeBinaryToWriter(message: MetaGetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaGetResponse;
  static deserializeBinaryFromReader(message: MetaGetResponse, reader: jspb.BinaryReader): MetaGetResponse;
}

export namespace MetaGetResponse {
  export type AsObject = {
    item?: Meta.AsObject,
    pageCount: number,
    tagsList: Array<Tag.AsObject>,
  }
}

export class SetFavoriteRequest extends jspb.Message {
  getId(): number;
  setId(value: number): SetFavoriteRequest;

  getFavorite(): boolean;
  setFavorite(value: boolean): SetFavoriteRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetFavoriteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetFavoriteRequest): SetFavoriteRequest.AsObject;
  static serializeBinaryToWriter(message: SetFavoriteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetFavoriteRequest;
  static deserializeBinaryFromReader(message: SetFavoriteRequest, reader: jspb.BinaryReader): SetFavoriteRequest;
}

export namespace SetFavoriteRequest {
  export type AsObject = {
    id: number,
    favorite: boolean,
  }
}

export class SetFavoriteResponse extends jspb.Message {
  getFavorite(): boolean;
  setFavorite(value: boolean): SetFavoriteResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetFavoriteResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetFavoriteResponse): SetFavoriteResponse.AsObject;
  static serializeBinaryToWriter(message: SetFavoriteResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetFavoriteResponse;
  static deserializeBinaryFromReader(message: SetFavoriteResponse, reader: jspb.BinaryReader): SetFavoriteResponse;
}

export namespace SetFavoriteResponse {
  export type AsObject = {
    favorite: boolean,
  }
}

export class GetPageRequest extends jspb.Message {
  getId(): number;
  setId(value: number): GetPageRequest;

  getPage(): number;
  setPage(value: number): GetPageRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetPageRequest): GetPageRequest.AsObject;
  static serializeBinaryToWriter(message: GetPageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPageRequest;
  static deserializeBinaryFromReader(message: GetPageRequest, reader: jspb.BinaryReader): GetPageRequest;
}

export namespace GetPageRequest {
  export type AsObject = {
    id: number,
    page: number,
  }
}

export class GetPageResponse extends jspb.Message {
  getImageData(): google_protobuf_wrappers_pb.BytesValue | undefined;
  setImageData(value?: google_protobuf_wrappers_pb.BytesValue): GetPageResponse;
  hasImageData(): boolean;
  clearImageData(): GetPageResponse;

  getContentType(): string;
  setContentType(value: string): GetPageResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetPageResponse): GetPageResponse.AsObject;
  static serializeBinaryToWriter(message: GetPageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPageResponse;
  static deserializeBinaryFromReader(message: GetPageResponse, reader: jspb.BinaryReader): GetPageResponse;
}

export namespace GetPageResponse {
  export type AsObject = {
    imageData?: google_protobuf_wrappers_pb.BytesValue.AsObject,
    contentType: string,
  }
}

export class TagListRequest extends jspb.Message {
  getFavoriteOnly(): boolean;
  setFavoriteOnly(value: boolean): TagListRequest;

  getPage(): number;
  setPage(value: number): TagListRequest;

  getItemPerPage(): number;
  setItemPerPage(value: number): TagListRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TagListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TagListRequest): TagListRequest.AsObject;
  static serializeBinaryToWriter(message: TagListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TagListRequest;
  static deserializeBinaryFromReader(message: TagListRequest, reader: jspb.BinaryReader): TagListRequest;
}

export namespace TagListRequest {
  export type AsObject = {
    favoriteOnly: boolean,
    page: number,
    itemPerPage: number,
  }
}

export class TagListResponse extends jspb.Message {
  getTotalPage(): number;
  setTotalPage(value: number): TagListResponse;

  getTagsList(): Array<Tag>;
  setTagsList(value: Array<Tag>): TagListResponse;
  clearTagsList(): TagListResponse;
  addTags(value?: Tag, index?: number): Tag;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TagListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TagListResponse): TagListResponse.AsObject;
  static serializeBinaryToWriter(message: TagListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TagListResponse;
  static deserializeBinaryFromReader(message: TagListResponse, reader: jspb.BinaryReader): TagListResponse;
}

export namespace TagListResponse {
  export type AsObject = {
    totalPage: number,
    tagsList: Array<Tag.AsObject>,
  }
}

export enum SORT_BY { 
  SORT_BY_CREATE_TIME = 0,
  SORT_BY_NAME = 1,
}
export enum ORDER { 
  ORDER_ASCENDING = 0,
  ORDER_DESCENDING = 1,
}
