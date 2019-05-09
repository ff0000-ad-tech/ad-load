<a name="ImageLoader"></a>

## ImageLoader
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> |  |
| cacheBuster | <code>boolean</code> |  |
| renderOnly | <code>boolean</code> | used when only needing to render, such as writing into the DOM as markup <svg> |
| crossOrigin | <code>string</code> |  |
| onComplete | <code>function</code> |  |
| onProgress | <code>function</code> |  |
| onFail | <code>function</code> |  |
| fileType | <code>string</code> | Manually assign the file type, eg: <code>truetype</code> or <code>woff</code> |


* [ImageLoader](#ImageLoader)
    * [new ImageLoader(target, arg)](#new_ImageLoader_new)
    * [.load()](#ImageLoader.load)

<a name="new_ImageLoader_new"></a>

### new ImageLoader(target, arg)
This class is designed to handle a single load of a font by assigning it to a generated stylesheet


| Param | Type | Description |
| --- | --- | --- |
| target | <code>string</code> | load target |
| arg | <code>object</code> | Object with any of the following optional parameters for customizing the load routine. |

<a name="ImageLoader.load"></a>

### ImageLoader.load()
Starts the load process.

**Kind**: static method of [<code>ImageLoader</code>](#ImageLoader)  
