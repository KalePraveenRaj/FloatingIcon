// Draggable function
function makeDraggable(element) {
    var offsetX, offsetY;

    element.addEventListener('mousedown', function(e) {
        e.preventDefault();
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;

        document.addEventListener('mousemove', dragElement);
        document.addEventListener('mouseup', stopDragging);
    });

    function dragElement(e) {
        e.preventDefault();
        element.style.left = (e.clientX - offsetX) + 'px';
        element.style.top = (e.clientY - offsetY) + 'px';
    }

    function stopDragging() {
        document.removeEventListener('mousemove', dragElement);
    }
}

// Make the draggable container draggable
makeDraggable(document.getElementById('draggableContainer'));

function toggleVisibility(id) {
    var element = document.getElementById(id);
    if (element.style.display === "none") {
        element.style.display = "inline";
    } else {
        element.style.display = "none";
    }
}

function toggleVisibility1(id) {
    var element = document.getElementById(id);
    if (element.style.display === "none") {
        element.style.display = "inline";
    } else {
        element.style.display = "none";
    }
}

function showAlert() {
    document.getElementById('alertBox').style.display = 'block';
}

function closeAlert() {
    document.getElementById('alertBox').style.display = 'none';
}
