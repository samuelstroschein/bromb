<p align="center">
    <img src="https://raw.githubusercontent.com/samuelstroschein/bromb/main/assets/submission-animation.gif" />
</p>

# bromb

A feedback widget for websites/web apps designed to be
- simple
- responsive
- configurable (categories)
- [one-click self-hostable](https://github.com/samuelstroschein/bromb-endpoint)
- work in no-code environments (website builders)
- make it easy to write own integrations (Slack, Notion, etc.)

## Getting Started

### 1. Copy the following code

Copy the following `<script>` `</script>` and place it in the head of your HTML. 

```html
<script
	async
	defer
	data-theme="light"
	src="https://cdn.jsdelivr.net/gh/samuelstroschein/bromb/packages/web/dist/widget.js"
></script>
```

### 2. Create a project

**Simple:** Create a project at [bromb.co](https://app.bromb.co/) (it's free).  
  
**Advanced:** Self-host an endpoint as described in [this repository](https://github.com/samuelstroschein/bromb-endpoint).


### 3. Trigger the widget

The bromb widget is triggered by clicking on a link on your site which follows the following schema `https://submission.bromb.co/<your organization name>/<your project name>`. We'll call that link [the trigger link](https://bromb.helpkit.so/Good-To-Know/wQs4WXa7Psb8rqWepyQJxe/Trigger-Links/tcdx5kdjtBexrDJrpGWYdC). 

#### Code

place an `<a>` in your markup. 

```html
<a href="https://submission.bromb.co/<your organization>/<your project>">
  Give us feedback
</a>
```


#### Website Builder

you can trigger the widget by placing a trigger link on your page. 

<p>
    <img width="300rem" src="https://raw.githubusercontent.com/samuelstroschein/bromb/main/assets/website-builder-trigger-link.png" />
</p>

## More Advanced Stuff

Take a look at the [docs](https://docs.bromb.co/Getting-Started/kp7gkUemPZXb9aFHtEEFra/Make-use-of-metadata/tLocGXW9aSUnG5eWJwDBGY).
