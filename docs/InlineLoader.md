<a name="InlineLoader"></a>

## InlineLoader
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> |  |
| cacheBuster | <code>boolean</code> |  |
| onComplete | <code>function</code> |  |
| onProgress | <code>function</code> |  |
| onFail | <code>function</code> |  |
| fileType | <code>string</code> | Manually assign the file type, eg: <code>css</code>, <code>script</code>, <code>html</code> |


* [InlineLoader](#InlineLoader)
    * [new InlineLoader(target, arg)](#new_InlineLoader_new)
    * [.load()](#InlineLoader.load)

<a name="new_InlineLoader_new"></a>

### new InlineLoader(target, arg)
This class is designed to handle a single load a file inlined by writing it to the head


| Param | Type | Description |
| --- | --- | --- |
| target | <code>string</code> | load target |
| arg | <code>object</code> | Object with any of the following optional parameters for customizing the load routine. |

<a name="InlineLoader.load"></a>

### InlineLoader.load()
Starts the load process.

**Kind**: static method of [<code>InlineLoader</code>](#InlineLoader)  
