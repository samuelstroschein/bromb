# Glossary

## Categories

Article Description: What are categories?
Published: Yes
Suggested: No

<aside>
💡 **Category Definition**
Help you and your customers classify the submissions. You can (and should) create own categories to reduce your workload in classifiying submissions.

</aside>

<aside>
📌 **Category** **Fields**

`Emoji` specifies the emoji.

`Id` is the identifier of the category and can be used to trigger the category directly with a [Category Trigger Link](Trigger%20Links%20dc37a6966a014611bf648943df31db4c.md). 

`Title` The title of the category. 

`Description` Give users a clear description what they should keep in mind when sending the submission.

</aside>

## Metadata

Article Description: What is metadata and how can I define own metadata?
Published: Yes
Suggested: No

<aside>
💡 **Metadata Definition**
Metadata is additional data that further describes a submission. For example, a submission could contain the metadata `device` which describes what device the user was using when he created the submission.

</aside>

### 📌 Metadata Fields

#### Provided by bromb:

`email` if provided
`device` of the user
`screenshot` if provided
`siteUrl` the site where the user created the submission
`triggerElementText` the text of the trigger element. If you trigger the bromb widget with a button saying "What metadata are you missing?", then "What metadata are you missing?" is the triggerElementText.

#### Provided by you:

You can define any metadata you'd like by defining the metadata in the Trigger Link. The metadata must always be a string/text and the total size, including bromb provided metadata, can not exceed 1kb.


## Trigger Links

Article Description: What is a trigger link?
Last Updated: August 4, 2021
Published: Yes
Suggested: Yes

<aside>
💡 **Trigger Link**
The bromb widget is triggered by clicking on a link on your site which follows the following schema `https://submission.bromb.co/<your organization name>/<your project name>`. We'll call that link **the trigger link**. In the case of ourselves, we simply place [https://submission.bromb.co/bromb/dashboard](https://submission.bromb.co/bromb/dashboard) somewhere in our dashboard to trigger the widget.

</aside>

<aside>
💡 **Category Trigger Link**
You can directly open a specific category by appending the [trigger link](Trigger%20Links%20dc37a6966a014611bf648943df31db4c.md) with a category id: ****`https://submission.bromb.co/<your organization name>/<your project nam>/<category id>`. 
For example: We have a category with `bug` as id. Using `[https://submission.bromb.co/bromb/dashboard/bug](https://submission.bromb.co/bromb/dashboard/bug)` will directly open the bug category.

</aside>

 

<aside>
💡 **Trigger Link with [Metadata](https://docs.bromb.co/Good-To-Know/wQs4WXa7Psb8rqWepyQJxe/Metadata/9vQNrvDVxyzSK1UnrqaVR5?internalLink)**
You can add custom [Metadata](https://docs.bromb.co/Good-To-Know/wQs4WXa7Psb8rqWepyQJxe/Metadata/9vQNrvDVxyzSK1UnrqaVR5?internalLink) to a submission by defining [query parameters](https://en.wikipedia.org/wiki/Query_string) like so:
`https://submission.bromb.co/example/project?userName=Samuel&language=de` 
The metadata `userName = Samuel` and `language = de` is now included in the submission.

👉 Tip: Filling in the email as metadata is especially useful if you know the email from the user before the submission.  

</aside>