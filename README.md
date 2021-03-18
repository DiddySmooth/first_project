# Escape the House

## Overview

The goal of the game is to retrieve an object inside the house and get out without any of the ghost catching you.

## Game rules

Player uses WASD to move through house; Creatures kill players; The player win by leaving with the object. Press F to turn on lights. 5 seconds of light on time. Lights on ghost cant hurt you.

## WireFrame

![wireframes](https://i.imgur.com/Zinsx4b.png)
![wireframes](https://i.imgur.com/PlLlN3t.png)

## User Statments

* When I open the door the house lights are off
* When I run into a wall I cannot move in that direction anymore
* Monsters are running around me in a patch when the lights are off
* When I press F the lights turn on for 5 seconds
* After 5 seconds the lights get turned of
* I have to wait 10s before I can use more lights
* When the light goes off enemies appear in new location
* When I walk to a door and press e it Opens
* When I touch a enemy I die
* When inside bed monsters dissappear
* I need to get an object inside the house
* I retrieve the object now i leave the house
* When i leave the House with the object I win

## MVP checklist

Create Canvas
Create collider class

* Class should have size and collision detection

Create player subclass
Create wall subclass
Create enemy subclass
Create PlayerMove function
Create CheckCollison function

* If colliders overlap return collison and object type
* This may go inside class for colliders

Create Lights function

* Lights turn of 5 off 10

Create EnemyMovement function
Create HideObject function
Create PlayerDied function
Create PlayerWon function

## Stretch Goals

Create OpenDoorFunction
Create function that determines what room you are in for lights
Create a Fog
MakeEnemyPaths Change

