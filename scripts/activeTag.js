const activeTagSection = document.getElementById('activeTags');

function activeTag() {
    const activeTag = document.createElement('span');
    activeTag.className = `w-[195px] h-[56px] flex justify-between items-center bg-selectedYellow rounded-[10px] py-[17px] px-[14px]`;
    activeTag.innerHTML = `
    Saucisse bretonne ou de Toulouse
    <button type="button" title="Effacer" id="searchClearButton" class="text-4xl pt-[2px] cursor-pointer">&times;</button>
    `;
    return activeTag;
}

const activeTagElement = activeTag();
activeTagSection.appendChild(activeTagElement);