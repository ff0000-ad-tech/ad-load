<a name="DataLoader"></a>

## DataLoader
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| query | <code>string</code> |  |
| name | <code>string</code> |  |
| cacheBuster | <code>boolean</code> |  |
| method | <code>string</code> | "POST" or "GET" |
| scope | <code>object</code> |  |
| onComplete | <code>function</code> |  |
| onProgress | <code>function</code> |  |
| onFail | <code>function</code> |  |
| platformGetUrl | <code>function</code> | A callback method to wrap the url, such as DoubleClick's <code>Enabler.getUrl</code>. |
| fileType | <code>string</code> | Manually assign the file type, eg: <code>json</code>, <code>xml</code>, <code>bin</code>. |


* [DataLoader](#DataLoader)
    * [new DataLoader(target, arg)](#new_DataLoader_new)
    * [.load()](#DataLoader.load)

<a name="new_DataLoader_new"></a>

### new DataLoader(target, arg)
This class is designed to handle a single load via XMLHttpRequest


| Param | Type | Description |
| --- | --- | --- |
| target | <code>string</code> | load target |
| arg | <code>object</code> | Object with any of the following optional parameters for customizing the load routine. |

<a name="DataLoader.load"></a>

### DataLoader.load()
Starts the load process.

**Kind**: static method of [<code>DataLoader</code>](#DataLoader)  
**Example**  
```js
// Single load
var dataLoader = new DataLoader('data.json', {
	name: 'my-data=loader',
	cacheBuster: true,
	onComplete: handleComplete,
	onFail: handleFail
})
dataLoader.load()

function handleComplete(target) {
	var loadedContent = target.dataRaw
}
function handleFail(error) {
	// error handle
}
```
