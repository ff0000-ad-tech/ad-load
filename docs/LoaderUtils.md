<a name="LoaderUtils"></a>

## LoaderUtils
**Kind**: global class  

* [LoaderUtils](#LoaderUtils)
    * [new LoaderUtils()](#new_LoaderUtils_new)
    * [.createXMLHttpRequest()](#LoaderUtils.createXMLHttpRequest) ⇒ <code>XMLHttpRequest</code>
    * [.getFileName(url)](#LoaderUtils.getFileName) ⇒ <code>string</code>
    * [.getFontName(url)](#LoaderUtils.getFontName) ⇒ <code>string</code>
    * [.getFileType(url)](#LoaderUtils.getFileType) ⇒ <code>string</code>
    * [.getFullUrl(prepend, file, platformGetUrl)](#LoaderUtils.getFullUrl) ⇒ <code>string</code>
    * [.getUrlPrepend(path)](#LoaderUtils.getUrlPrepend) ⇒ <code>string</code>
    * [.getParamsFromData(query)](#LoaderUtils.getParamsFromData) ⇒ <code>string</code>

<a name="new_LoaderUtils_new"></a>

### new LoaderUtils()
Various single use utilities for file names & paths, and query manipulations.
<pre class="sunlight-highlight-javascript">
import { LoaderUtils } from 'ad-load'
</pre>

<a name="LoaderUtils.createXMLHttpRequest"></a>

### LoaderUtils.createXMLHttpRequest() ⇒ <code>XMLHttpRequest</code>
**Kind**: static method of [<code>LoaderUtils</code>](#LoaderUtils)  
<a name="LoaderUtils.getFileName"></a>

### LoaderUtils.getFileName(url) ⇒ <code>string</code>
**Kind**: static method of [<code>LoaderUtils</code>](#LoaderUtils)  
**Returns**: <code>string</code> - Strips a file path and extension to return the file name  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | A full file path including the file name |

<a name="LoaderUtils.getFontName"></a>

### LoaderUtils.getFontName(url) ⇒ <code>string</code>
**Kind**: static method of [<code>LoaderUtils</code>](#LoaderUtils)  
**Returns**: <code>string</code> - Strips a file path and extension to return the file name  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | A full file path including the file name |

<a name="LoaderUtils.getFileType"></a>

### LoaderUtils.getFileType(url) ⇒ <code>string</code>
**Kind**: static method of [<code>LoaderUtils</code>](#LoaderUtils)  
**Returns**: <code>string</code> - Determines the file type and returns that  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | A full file path including the file name |

<a name="LoaderUtils.getFullUrl"></a>

### LoaderUtils.getFullUrl(prepend, file, platformGetUrl) ⇒ <code>string</code>
**Kind**: static method of [<code>LoaderUtils</code>](#LoaderUtils)  
**Returns**: <code>string</code> - Determines the full url path to a file by either matching the protocol or
		utilizing a platform tool, such as DoubleClick's <code>Enabler.getUrl</code>  

| Param | Type | Description |
| --- | --- | --- |
| prepend | <code>string</code> | The file path |
| file | <code>string</code> | The file name with extension |
| platformGetUrl | <code>function</code> | Optional platform specific url formatter |

<a name="LoaderUtils.getUrlPrepend"></a>

### LoaderUtils.getUrlPrepend(path) ⇒ <code>string</code>
**Kind**: static method of [<code>LoaderUtils</code>](#LoaderUtils)  
**Returns**: <code>string</code> - Removes the file name and extension to retun only the path  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | A full file path including the file name |

<a name="LoaderUtils.getParamsFromData"></a>

### LoaderUtils.getParamsFromData(query) ⇒ <code>string</code>
**Kind**: static method of [<code>LoaderUtils</code>](#LoaderUtils)  
**Returns**: <code>string</code> - Formats a query string and returns it  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> \| <code>object</code> | A query string or object of key/value pairs |

