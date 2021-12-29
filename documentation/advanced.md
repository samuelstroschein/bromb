## Directly open a specific category

Article Description: Learn more about Category Trigger Links
Published: Yes
Suggested: No

Bromb let's you open a specific category directly by using a [Category Trigger Link](./glossary.md). 

<aside>
💡 **Category Trigger Link**
You can directly open a specific category by appending the [trigger link](./glossary.md) with a category id: ****`https://submission.bromb.co/<your organization name>/<your project nam>/<category id>`. 
For example: We have a category with `bug` as id. Using 'https://submission.bromb.co/bromb/dashboard/bug' will directly open the bug category.

</aside>

## Make use of metadata

Article Description: How to include custom metadata for submissions.
Published: Yes
Suggested: No

You can define any metadata you'd like by defining the metadata in the Trigger Link. The metadata must always be a string/text and the total size, including metadata provided by bromb, can not exceed 1kb. 

<aside>
💡 **Metadata Definition**
Metadata is additional data that further describes a submission. For example, a submission could contain the metadata `device` which describes what device the user was using when he created the submission.

</aside>

#### 📌 Metadata Fields

*Provided from* *Bromb*:
`email` if provided
`device` of the user
`screenshot` if provided
`siteUrl` the site where the user created the submission
`triggerElementText` the text of the trigger element. If you trigger the bromb widget with a button saying "What metadata are you missing?", then "What metadata are you missing?" is the triggerElementText.


## Use categories to your advantage

<aside>
💡 **Category Definition**
Helps you and your customers classify the submissions. You can (and should) create own categories to reduce your workload in classifiying submissions.

</aside>

Open the category directly

<aside>
💡 **Category Trigger Link**
You can directly open a specific category by appending the [trigger link](./glossary.md) with a category id: ****`https://submission.bromb.co/<your organization name>/<your project nam>/<category id>`. 
For example: We have a category with `bug` as id. Using `[https://submission.bromb.co/bromb/dashboard/bug](https://submission.bromb.co/bromb/dashboard/bug)` will directly open the bug category.

</aside>
