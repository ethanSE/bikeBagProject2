
# _Bike Bag Project_

#### By _**Ethan Samuels-Ellingson**_

https://ethanse.github.io/bikeBagProject/

## Description

As a cycling enthusiast and bike commuter I have been interested in custom bike frame bags for a while and have sewn several of my own design over the past year. 


I have researched the custom made-to-order bike frame bag market and have noticed several areas in which tech could help to connect customers with products.


1. Many company's are out-dated and require users to fill out complex forms with several meauserments to place custom orders. On several companies' websites the call to action is to email them to begin the communication process. This is not particularly engaging.

2. There is a lot of room for automation in the design and construction process that would reduce time and material costs.


My solution to this problem is a web-based application in which:

1. A user can visit a company's webiste, upload a picture of their bike, establish a scale, and input a custom shape.   
This makes getting the process started for the customer much easier.

2. On payment a work order with customer information and a customized design is stored in the backend. 

3. An employee can access the orders through an admin route, download plans, and batch multiple orders to perform cutting stock optimizations to reduce material waste.



In its current state this project:  
  • demonstrate swhat the front end of such an application could look like  
  • provides a directed user experience  
  • generates an svg file with real-world scale which can be downloaded by the user  
  
  output is set up to be read by software that will optimize fabric usage    
  For and awesome open-source program to solve the 2D cutting stock problem with irregular polygons check out https://deepnest.io/ by Jack Qiao.

Goals for this project include:  
  • do some more math to add in seam allowances  
  • icorporate a firebase back-end with authentication, data persistance, admin route for accessing orders  
  • in admin route overlay user input and user's photo for verification of user input prior to construction. allow admin to tweak design before production or contact customer  
  • get some more experience with web development and see if any companies are interesting in implementing a similar solution

## Support and contact details

_contact Ethan Samuels-Ellingson at ethansamuelsellingson@gmail.com _
## Technologies Used

_React_  
_Redux_  
_Thunk   
_Canvas2Svg_  

### License


MIT License
Copyright (c) 2019 **_Ethan Samuels-Ellingson_**

