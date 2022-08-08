# INTRODUCTION

### `Project definition`
Created graphic-based web app which allows user to create tree of family members (read and update mode), anybody will be able to view the tree (only read mode). In view mode, you can click on node representing yourself, then relation of whole tree will be updated as per your perspective. So you will be able to know the relation with any member of family.

### `Objective`
What is the IDEA behind the making of the website OR how this website is useful
    1)	This website is useful for the kids to know their family by the use of graphics.
    2)	You can give your family’s overview to anybody and for other people it will be so easy to understand the family tree.
    3)	Any person of the family can enjoy the family view by their perspective. 
    
    
### `Features &functionalities:`

### `View Tree`
View tree api will fetch the details about the tree nodes and edges and though react flow library it will be displayed on the pane.On pan all the nodes and corresponding edges are shown so whole tree with the name on nodes and edges will be shown to the user.Here in view mode user will not allowed to make any kind of changes in the tree, user can not even move the node, they just click on the node.User can see the whole family tree. Now user will click on any particular node then “find my relation” algorithm fired and relation of every node from the clicked node will be determined as stored in the local machine.And now new updated tree with the relation will be rendered to the screen.So user will be able to see the tree by clicked node perspective. So user can also enjoy the tree by their perspective.

### `Find my relation`

List of relations is displayed below.
1)	You
2)	Wife / Husband
3)	Brother / Sister in law
4)	Sister / Brother in law
5)	Dad / Mom
6)	Uncle / Aunt
7)	Grandfather / Grandmother
8)	Son / Daughter in law
9)	Daughter / Son in law
10)	 Nephew / Niece in law
11)	 Niece / Nephew in law

So for any two members of the same family one of the relation will be defined And algorithm of finding the relation is work upon id of the nodes .This ids are made such a way that this is very easy to find the relation.
 


## `Home Page:-`

![home](https://user-images.githubusercontent.com/89090001/183377149-42d7a26b-4a2f-431c-957e-d4812edc5a34.png)

## `Registration / Sign-up:-`

![sign-up](https://user-images.githubusercontent.com/89090001/183377831-5680dee8-4a81-4055-bbf5-f6d812f7fc6f.png)

## `Sign-in:-`

![sign in](https://user-images.githubusercontent.com/89090001/183377909-5bc1c8ef-00d9-407a-92ad-0bd8793b72b7.png)

## `User Profile:-`

![user-profile](https://user-images.githubusercontent.com/89090001/183378236-6c93c84a-60a6-426b-b0c5-68331368d2ad.png)

## `Create tree:-`

![create-tree](https://user-images.githubusercontent.com/89090001/183378444-b461d6b2-6f68-4f1f-a1d5-5b70f26a0a9e.png)

## `View tree:-`

![view-tree](https://user-images.githubusercontent.com/89090001/183378570-72ab10a2-34ce-4d0e-b85f-65c1a2cb3790.png)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
