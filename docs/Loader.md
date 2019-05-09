<a name="Loader"></a>

## Loader
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> |  |
| prioritize | <code>boolean</code> |  |
| cacheBuster | <code>boolean</code> |  |
| scope | <code>object</code> |  |
| onComplete | <code>function</code> |  |
| onProgress | <code>function</code> |  |
| onFail | <code>function</code> |  |
| prepend | <code>string</code> | A file path to be added to all loader targets. |
| platformGetUrl | <code>function</code> | A callback method to wrap the url, such as DoubleClick's <code>Enabler.getUrl</code>. |
| fileType | <code>string</code> | Manually assign the file type, eg: <code>jpg</code>, <code>svg</code>. |


* [Loader](#Loader)
    * [new Loader(target, arg)](#new_Loader_new)
    * [.add(arg)](#Loader.add)
    * [.load()](#Loader.load)
    * [.getAllContent()](#Loader.getAllContent) ⇒ <code>array</code>
    * [.getAllContentRaw()](#Loader.getAllContentRaw) ⇒ <code>array</code>
    * [.getLoader(id)](#Loader.getLoader) ⇒ [<code>Loader</code>](#Loader)

<a name="new_Loader_new"></a>

### new Loader(target, arg)
This class is designed to handle all load processes: images, fonts and data, even other Loaders! Below are multiple use case scenarios.
<br><br>
<b>Single Load:</b>
<pre class="sunlight-highlight-javascript">
import { Loader } from 'ad-load'

var singleLoader = new Loader('images/img0.jpg', { onComplete:handleLoadComplete, scope:this })
singleLoader.load()

function handleLoadComplete(target) {
	console.log(target.content[0].dataRaw)
}
</pre>
<br><br>
<b>Array of loads from one Constructor:</b>
<pre class="sunlight-highlight-javascript">
// Array load - you can pass in multiple files on creation of a Loader
var arrayLoader = new Loader(['font1.ttf', 'font2.ttf'], { name:'fontLoader', onComplete:handleLoadComplete, prepend:adParams.commonPath + 'fonts/' })
arrayLoader.load()

function handleLoadComplete(target) {
	console.log(target.content[0].dataRaw)
}
</pre>
<br><br>
<b>Complex Load:</b>
<pre class="sunlight-highlight-javascript">
var myLoader = new Loader('images/img0.jpg', { onComplete:handleLoadComplete, scope:this })

// append to that loader
myLoader.add('images/img1.jpg')

// append multiple
myLoader.add(['images/img2.jpg', 'images/img3.jpg'])
myLoader.load()

function handleLoadComplete(target) {
	console.log( target.content[0].dataRaw )
}
</pre>
<br><br>
<b>Nested Loads:</b>
<pre class="sunlight-highlight-javascript">
// Nested loads - best practice is to make a loader for one file type
var masterLoader = new Loader({ name:'master', onComplete:handleAllComplete, onProgress:handleAllProgress, onFail:handleLoadFail, scope:this })

// declare a var to reference later, then add it to main loader
var _imgLoader = new Loader(['images/img2.jpg', 'images/img3.jpg'], { name:'load_images', prepend:'images/' })
masterLoader.add(_imgLoader)

// or just add a new loader instance
masterLoader.add(
	new Loader(['font1.ttf', 'font2.ttf' ], { name:'load_fonts', prepend: 'fonts/' })
)
masterLoader.add(
	new Loader(['AdData.js', 'Align.js', 'Clamp.js'], { name:'load_js', prepend: 'utils/' })
)
masterLoader.load()

function handleLoadComplete(target) {
	console.log(target.content[0].dataRaw)
}
function handleLoadProgress(target) {
	console.log(target.progress, target.rawProgress)
}
function handleLoadFail(target) {
	console.log(target);
}
function handleAllComplete(target) {
	var a = target.getLoader(_imgLoader)
	console.log("Loader found by var:", a)

	var b = target.getContent('font1.ttf')
	console.log("Content found by name:", b)

	var c = target.getLoader('load_fonts')
	console.log("Loader found by url:", c)
}
</pre>


| Param | Type | Description |
| --- | --- | --- |
| target | <code>string</code> \| <code>array</code> \| [<code>Loader</code>](#Loader) | load target |
| arg | <code>object</code> | Object with any of the following optional parameters for customizing the load routine. |

<a name="Loader.add"></a>

### Loader.add(arg)
Add to the load queue: a single or array of files or even another Loader.

**Kind**: static method of [<code>Loader</code>](#Loader)  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>string</code> \| <code>array</code> \| [<code>Loader</code>](#Loader) | a file, array of files, or Loader instance |

**Example**  
```js
// Single load
var imgLoader = new Loader({ name:'img_loader' })

// add to that loader
imgLoader.add('images/img1.jpg')

// add multiple
imgLoader.add(['images/img2.jpg', 'images/img3.jpg'])

// Nested loads - best practice is to make a loader for one file type
var mainLoader = new Loader({ name:'main', onComplete:handleComplete })

mainLoader.add(imgLoader)

// or just add a new loader instance
mainLoader.add(new Loader(['font1.ttf', 'font2.ttf'], { name:'load_fonts' }))
```
<a name="Loader.load"></a>

### Loader.load()
Starts the load process.

**Kind**: static method of [<code>Loader</code>](#Loader)  
**Example**  
```js
// Single load
var imgLoader = new Loader({ onComplete:handleComplete })
imgLoader.load()
```
<a name="Loader.getAllContent"></a>

### Loader.getAllContent() ⇒ <code>array</code>
Get all loaded content from the Loader and all nested Loaders

**Kind**: static method of [<code>Loader</code>](#Loader)  
**Returns**: <code>array</code> - An array of LoaderData Objects with relevant loading information (like an Event Object).
	Access the loaded content via the property 'dataRaw': an image, raw Json, raw XML, or font name  
**Example**  
```js
var myLoader = new Loader(['img1.jpg', 'img2.jpg', 'img3.jpg'], { onComplete:handleComplete })
 myLoader.load()

 function handleComplete(target) {
 	var myContent = target.getAllContent()
 	console.log("Content found:", myContent)
 }
```
<a name="Loader.getAllContentRaw"></a>

### Loader.getAllContentRaw() ⇒ <code>array</code>
Get all raw loaded content from the Loader and all nested Loaders, no LoaderData Objects

**Kind**: static method of [<code>Loader</code>](#Loader)  
**Returns**: <code>array</code> - An array of only the raw data: an image, raw Json, raw XML, or font name  
**Example**  
```js
var myLoader = new Loader(['img1.jpg', 'img2.jpg', 'img3.jpg'], { onComplete:handleComplete })
myLoader.load()

function handleComplete(target) {
	var myContent = target.getAllContentRaw()
	console.log("Content found:", myContent)
}
```
<a name="Loader.getLoader"></a>

### Loader.getLoader(id) ⇒ [<code>Loader</code>](#Loader)
Get the Loader instance from the Loader or any nested Loader

**Kind**: static method of [<code>Loader</code>](#Loader)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | the string optionally assigned to the 'name' property or the variable assigned to the Loader instance |

**Example**  
```js
var mainLoader = new Loader({ name:'main', onComplete:handleLoadComplete })
mainLoader.add(
	new Loader(['font1.ttf', 'font2.ttf'], { name: 'load_fonts', prepend: 'fonts/' }
	)
)
mainLoader.add(
	new Loader(['Ad_Data.js', 'NetUtils.js'], { name: 'load_js', prepend: 'utils/' })
)
mainLoader.load()

function handleLoadComplete(target) {
	var fontLoader = target.getLoader('load_fonts')
}
```
