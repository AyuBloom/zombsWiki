# Minor Bugs

This article contains some bugs that are not impactful to the game that are still present to this day.

## Visual Chaos

### Phenomenon

Sometimes, not always nor guaranteed, the game renderer freaks out and all of the visuals get distorted and slowly becomes chaos.

### Example

A video by iX has a demonstration of the bug [here](https://www.youtube.com/watch?v=U-esBrGTHu4).

### Cause

A `WebglContextLost` event will trigger this bug. The reason behind the event is unknown, perhaps just an underlying WebGL failure.
