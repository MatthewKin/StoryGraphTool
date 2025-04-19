# The Frozen Wasteland
## Location-Specific Interactive Mechanism 
In the "Box" location (marked as LocationSpecific: "PuzzleBox"), the player is prompted to manually enter a 3-digit code via a popup prompt. If the code is correct (549), they successfully open the box and proceed. If not, they are asked to try again.

## Lock-and-Key Puzzle
A rusty old key is hidden under ashes at the campfire. Also, the flashlight acts like a key to access the village

## Extra Credit: Item System
An inventory system is implemented.

Items like "Key" and "Flashlight" are added to the player's inventory when discovered.

Choices can be locked behind required items (RequiredItem) and are only shown when the item is held.

Duplicates are prevented via inventory checks.