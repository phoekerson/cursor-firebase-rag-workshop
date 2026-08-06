import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateDocumentData {
  rowsInserted?: number | null;
}

export interface CreateDocumentVariables {
  title: string;
  content: string;
  contentEmbedding: string;
}

export interface Document_Key {
  id: UUIDString;
  __typename?: 'Document_Key';
}

export interface ListDocumentsData {
  documents?: unknown[] | null;
}

export interface SearchSimilarDocumentsData {
  documents?: unknown[] | null;
}

export interface SearchSimilarDocumentsVariables {
  queryEmbedding: string;
  limit?: number | null;
}

interface CreateDocumentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDocumentVariables): MutationRef<CreateDocumentData, CreateDocumentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateDocumentVariables): MutationRef<CreateDocumentData, CreateDocumentVariables>;
  operationName: string;
}
export const createDocumentRef: CreateDocumentRef;

export function createDocument(vars: CreateDocumentVariables): MutationPromise<CreateDocumentData, CreateDocumentVariables>;
export function createDocument(dc: DataConnect, vars: CreateDocumentVariables): MutationPromise<CreateDocumentData, CreateDocumentVariables>;

interface ListDocumentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDocumentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListDocumentsData, undefined>;
  operationName: string;
}
export const listDocumentsRef: ListDocumentsRef;

export function listDocuments(options?: ExecuteQueryOptions): QueryPromise<ListDocumentsData, undefined>;
export function listDocuments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListDocumentsData, undefined>;

interface SearchSimilarDocumentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchSimilarDocumentsVariables): QueryRef<SearchSimilarDocumentsData, SearchSimilarDocumentsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SearchSimilarDocumentsVariables): QueryRef<SearchSimilarDocumentsData, SearchSimilarDocumentsVariables>;
  operationName: string;
}
export const searchSimilarDocumentsRef: SearchSimilarDocumentsRef;

export function searchSimilarDocuments(vars: SearchSimilarDocumentsVariables, options?: ExecuteQueryOptions): QueryPromise<SearchSimilarDocumentsData, SearchSimilarDocumentsVariables>;
export function searchSimilarDocuments(dc: DataConnect, vars: SearchSimilarDocumentsVariables, options?: ExecuteQueryOptions): QueryPromise<SearchSimilarDocumentsData, SearchSimilarDocumentsVariables>;

