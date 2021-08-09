export default (targetDOM: HTMLElement | null, total: number, once: number) => {
  let index = 0;
  const loop = (curTotal: number, curIndex: number) => {
    if (curTotal <= 0) return;
    let pageCount = Math.min(curTotal, once);

    window.requestAnimationFrame(() => {
      let fragment = document.createDocumentFragment();
      for (let i = 0; i < pageCount; i++) {
        let li = document.createElement('li');
        li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total);
        fragment.appendChild(li);
      }
      targetDOM?.appendChild(fragment);
      loop(curTotal - pageCount, curIndex + pageCount);
    });
  };

  loop(total, index);
};
