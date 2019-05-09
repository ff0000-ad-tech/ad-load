<a name="FontLoader"></a>

## FontLoader
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> |  |
| cacheBuster | <code>boolean</code> |  |
| onComplete | <code>function</code> |  |
| onProgress | <code>function</code> |  |
| onFail | <code>function</code> |  |
| fileType | <code>string</code> | Manually assign the file type, eg: <code>truetype</code> or <code>woff</code> |


* [FontLoader](#FontLoader)
    * [new FontLoader(target, arg)](#new_FontLoader_new)
    * [.load()](#FontLoader.load)

<a name="new_FontLoader_new"></a>

### new FontLoader(target, arg)
This class is designed to handle a single load of a font by assigning it to a generated stylesheet


| Param | Type | Description |
| --- | --- | --- |
| target | <code>string</code> | load target |
| arg | <code>object</code> | Object with any of the following optional parameters for customizing the load routine. |

<a name="FontLoader.load"></a>

### FontLoader.load()
Starts the load process.

**Kind**: static method of [<code>FontLoader</code>](#FontLoader)  
