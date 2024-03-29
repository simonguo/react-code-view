import React from 'react';

function CodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      aria-label="code"
      {...props}
    >
      <path d="M10.033 1.321a.5.5 0 01.958.272l-.025.087-5 13a.5.5 0 01-.958-.272l.025-.087 5-13zm5.802 7.091l-2.859 2.917c-.223.228-.585.228-.809 0s-.223-.597 0-.825L14.623 8l-2.456-2.504a.592.592 0 01-.066-.744l.066-.081a.563.563 0 01.729-.067l.079.067 2.859 2.917c.099.101.154.23.165.363v.099a.588.588 0 01-.165.363zM.165 7.588l2.859-2.917c.223-.228.585-.228.809 0s.223.597 0 .825L1.377 8l2.456 2.504a.592.592 0 01.066.744l-.066.081a.563.563 0 01-.729.068l-.079-.068L.166 8.412a.585.585 0 01-.165-.363V7.95a.588.588 0 01.165-.363z"></path>
    </svg>
  );
}

export default CodeIcon;
