# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `connector`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListDocuments*](#listdocuments)
  - [*SearchSimilarDocuments*](#searchsimilardocuments)
- [**Mutations**](#mutations)
  - [*CreateDocument*](#createdocument)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `connector`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `connector` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListDocuments
You can execute the `ListDocuments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listDocuments(options?: ExecuteQueryOptions): QueryPromise<ListDocumentsData, undefined>;

interface ListDocumentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDocumentsData, undefined>;
}
export const listDocumentsRef: ListDocumentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listDocuments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListDocumentsData, undefined>;

interface ListDocumentsRef {
  ...
  (dc: DataConnect): QueryRef<ListDocumentsData, undefined>;
}
export const listDocumentsRef: ListDocumentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listDocumentsRef:
```typescript
const name = listDocumentsRef.operationName;
console.log(name);
```

### Variables
The `ListDocuments` query has no variables.
### Return Type
Recall that executing the `ListDocuments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListDocumentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListDocumentsData {
  documents?: unknown[] | null;
}
```
### Using `ListDocuments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listDocuments } from '@dataconnect/generated';


// Call the `listDocuments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listDocuments();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listDocuments(dataConnect);

console.log(data.documents);

// Or, you can use the `Promise` API.
listDocuments().then((response) => {
  const data = response.data;
  console.log(data.documents);
});
```

### Using `ListDocuments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listDocumentsRef } from '@dataconnect/generated';


// Call the `listDocumentsRef()` function to get a reference to the query.
const ref = listDocumentsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listDocumentsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.documents);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.documents);
});
```

## SearchSimilarDocuments
You can execute the `SearchSimilarDocuments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
searchSimilarDocuments(vars: SearchSimilarDocumentsVariables, options?: ExecuteQueryOptions): QueryPromise<SearchSimilarDocumentsData, SearchSimilarDocumentsVariables>;

interface SearchSimilarDocumentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchSimilarDocumentsVariables): QueryRef<SearchSimilarDocumentsData, SearchSimilarDocumentsVariables>;
}
export const searchSimilarDocumentsRef: SearchSimilarDocumentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
searchSimilarDocuments(dc: DataConnect, vars: SearchSimilarDocumentsVariables, options?: ExecuteQueryOptions): QueryPromise<SearchSimilarDocumentsData, SearchSimilarDocumentsVariables>;

interface SearchSimilarDocumentsRef {
  ...
  (dc: DataConnect, vars: SearchSimilarDocumentsVariables): QueryRef<SearchSimilarDocumentsData, SearchSimilarDocumentsVariables>;
}
export const searchSimilarDocumentsRef: SearchSimilarDocumentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the searchSimilarDocumentsRef:
```typescript
const name = searchSimilarDocumentsRef.operationName;
console.log(name);
```

### Variables
The `SearchSimilarDocuments` query requires an argument of type `SearchSimilarDocumentsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SearchSimilarDocumentsVariables {
  queryEmbedding: string;
  limit?: number | null;
}
```
### Return Type
Recall that executing the `SearchSimilarDocuments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SearchSimilarDocumentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SearchSimilarDocumentsData {
  documents?: unknown[] | null;
}
```
### Using `SearchSimilarDocuments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, searchSimilarDocuments, SearchSimilarDocumentsVariables } from '@dataconnect/generated';

// The `SearchSimilarDocuments` query requires an argument of type `SearchSimilarDocumentsVariables`:
const searchSimilarDocumentsVars: SearchSimilarDocumentsVariables = {
  queryEmbedding: ..., 
  limit: ..., // optional
};

// Call the `searchSimilarDocuments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await searchSimilarDocuments(searchSimilarDocumentsVars);
// Variables can be defined inline as well.
const { data } = await searchSimilarDocuments({ queryEmbedding: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await searchSimilarDocuments(dataConnect, searchSimilarDocumentsVars);

console.log(data.documents);

// Or, you can use the `Promise` API.
searchSimilarDocuments(searchSimilarDocumentsVars).then((response) => {
  const data = response.data;
  console.log(data.documents);
});
```

### Using `SearchSimilarDocuments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, searchSimilarDocumentsRef, SearchSimilarDocumentsVariables } from '@dataconnect/generated';

// The `SearchSimilarDocuments` query requires an argument of type `SearchSimilarDocumentsVariables`:
const searchSimilarDocumentsVars: SearchSimilarDocumentsVariables = {
  queryEmbedding: ..., 
  limit: ..., // optional
};

// Call the `searchSimilarDocumentsRef()` function to get a reference to the query.
const ref = searchSimilarDocumentsRef(searchSimilarDocumentsVars);
// Variables can be defined inline as well.
const ref = searchSimilarDocumentsRef({ queryEmbedding: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = searchSimilarDocumentsRef(dataConnect, searchSimilarDocumentsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.documents);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.documents);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `connector` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateDocument
You can execute the `CreateDocument` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createDocument(vars: CreateDocumentVariables): MutationPromise<CreateDocumentData, CreateDocumentVariables>;

interface CreateDocumentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDocumentVariables): MutationRef<CreateDocumentData, CreateDocumentVariables>;
}
export const createDocumentRef: CreateDocumentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createDocument(dc: DataConnect, vars: CreateDocumentVariables): MutationPromise<CreateDocumentData, CreateDocumentVariables>;

interface CreateDocumentRef {
  ...
  (dc: DataConnect, vars: CreateDocumentVariables): MutationRef<CreateDocumentData, CreateDocumentVariables>;
}
export const createDocumentRef: CreateDocumentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createDocumentRef:
```typescript
const name = createDocumentRef.operationName;
console.log(name);
```

### Variables
The `CreateDocument` mutation requires an argument of type `CreateDocumentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateDocumentVariables {
  title: string;
  content: string;
  contentEmbedding: string;
}
```
### Return Type
Recall that executing the `CreateDocument` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateDocumentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateDocumentData {
  rowsInserted?: number | null;
}
```
### Using `CreateDocument`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createDocument, CreateDocumentVariables } from '@dataconnect/generated';

// The `CreateDocument` mutation requires an argument of type `CreateDocumentVariables`:
const createDocumentVars: CreateDocumentVariables = {
  title: ..., 
  content: ..., 
  contentEmbedding: ..., 
};

// Call the `createDocument()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createDocument(createDocumentVars);
// Variables can be defined inline as well.
const { data } = await createDocument({ title: ..., content: ..., contentEmbedding: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createDocument(dataConnect, createDocumentVars);

console.log(data.rowsInserted);

// Or, you can use the `Promise` API.
createDocument(createDocumentVars).then((response) => {
  const data = response.data;
  console.log(data.rowsInserted);
});
```

### Using `CreateDocument`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createDocumentRef, CreateDocumentVariables } from '@dataconnect/generated';

// The `CreateDocument` mutation requires an argument of type `CreateDocumentVariables`:
const createDocumentVars: CreateDocumentVariables = {
  title: ..., 
  content: ..., 
  contentEmbedding: ..., 
};

// Call the `createDocumentRef()` function to get a reference to the mutation.
const ref = createDocumentRef(createDocumentVars);
// Variables can be defined inline as well.
const ref = createDocumentRef({ title: ..., content: ..., contentEmbedding: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createDocumentRef(dataConnect, createDocumentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.rowsInserted);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.rowsInserted);
});
```

