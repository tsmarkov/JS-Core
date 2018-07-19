function traverseHTML(selector) {
    let selectedElement = $(selector)[0];
    let deepestNestedElements = $(`${selector} *:not(:has(*))`);

    let deepestPath = 0;
    let deepestElement;

    deepestNestedElements.each(function (index, element) {
        let currentDepth = 0;
        let originalElement = element;

        while (element) {
            currentDepth++;
            element = $(element).parent()[0];
        }

        if (currentDepth > deepestPath) {
            deepestPath = currentDepth;
            deepestElement = originalElement;
        }

    });

    while (deepestElement && deepestElement !== selectedElement) {
        $(deepestElement).addClass('highlight');

        deepestElement = $(deepestElement).parent()[0];
    }
    
    $(selector).addClass('highlight')
}