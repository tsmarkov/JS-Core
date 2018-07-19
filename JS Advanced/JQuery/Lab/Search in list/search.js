function search() {
    let searchedText = $('#searchText').val();
    let matchesCount = 0;

    $('#towns li').each((index, element) => {
        if (element.textContent.includes(searchedText)) {
            matchesCount++;
            $(element).css("font-weight", "bold");
        } else {
            $(element).css("font-weight", "");
        }
    });

    $('#result').text(`${matchesCount} matches found.`);
}