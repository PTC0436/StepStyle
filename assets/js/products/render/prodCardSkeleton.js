const prodCardSkeleton = (className) => {
  return `
    <div class="${className}">
      <div class="prod__card">
        <div class="prod__thumb">
          <a class="skeleton max-width-100 border-radius-10px aspect-ratio-4-3"></a>
        </div>
        <div class="prod__content">
          <div class="skeleton max-width-200px height-20px border-radius-5px"></div>
          <p class="prod__brand skeleton max-width-100px height-18px border-radius-5px margin-top-5px"></p>
          <div class="prod__price skeleton max-width-250px height-20px border-radius-5px"></div>
          <div class="prod__rating skeleton max-width-150px height-18px border-radius-5px margin-top-5px"></div>
        </div>
      </div>
    </div>
  `;
};

export default prodCardSkeleton;
