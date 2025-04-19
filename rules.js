class Start extends Scene {
    create() {
        
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location

        if (!this.engine.inventory){
            this.engine.inventory = [];
        }
        
        
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data

        //check if location has an item AND if item is NOT already in inventory
        if (locationData.Item && !this.engine.inventory.includes(locationData.Item)) {
            this.engine.inventory.push(locationData.Item);
            //testing if stuff enters inventory properly/no dupes
            console.log(locationData.Item + " is now in inventory"); 
            console.log(this.engine.inventory);
        }

        //special location
        if (this.engine.storyData.Locations[key].LocationSpecific) {
            if (locationData.LocationSpecific === "SleepingBags") {
                console.log("Test for SleepingBags");
            }
            
            if (locationData.LocationSpecific === "PuzzleBox") {
                console.log("PuzzleBox active");
                this.engine.addChoice("Try to open the box", "attemptPuzzleBox");
            }
        }
        
        if(this.engine.storyData.Locations[key].Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                if(choice.RequiredItem && !this.engine.inventory.includes(choice.RequiredItem)){
                    console.log("RequiredItem Needed Here: " + choice.RequiredItem);
                     continue; //skips entry if has Lock + doesn't have required item for lock
                }
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }

    }

    handleChoice(choice) {
        //special location input
        if (choice === "attemptPuzzleBox") {
            let userInput = prompt("Enter the 3-digit code:");
            if (userInput === "549") {
                this.engine.show("The box clicks open.");
                this.engine.gotoScene(Location, "FlashlightFound");
            } else {
                this.engine.show("Nothing happens. That code didn't work.");
                // Reload the same scene so they can try again
                this.engine.gotoScene(Location, "Box");
            }
            return;
        }


        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            console.log("it went to end here");
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.inventory = [];

Engine.load(Start, 'myStory.json');