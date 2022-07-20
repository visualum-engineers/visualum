import React, { PureComponent, Requireable } from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
export type ClampLinesState = {
  expanded: boolean;
  noClamp: boolean;
  text: string;
};
export interface ClampLinesProps {
  text: string;
  id: string;
  lines?: number;
  ellipsis?: string;
  buttons?: boolean;
  moreText?: string;
  lessText?: string;
  className?: string;
  delay?: number;
  stopPropagation?: boolean;
  innerElement?: string;
  styles?: { [key: string]: string };
  btnStyles?: { [key: string]: string };
  customOnChange?: (e: ClampLinesState) => void;
}
type MapRequireable<T> = { [Property in keyof T]: Requireable<T[Property]> };

export default class ClampLines extends PureComponent<ClampLinesProps> {
  static propTypes: MapRequireable<ClampLinesProps>;
  static defaultProps: {
    lines: 3;
    ellipsis: "...";
    buttons: true;
    moreText: "Read more";
    lessText: "Read less";
    delay: 500;
    innerElement: "div";
  };
  element: any = null;
  original: any = "";
  watch: any = true;
  lineHeight: any = 0;
  start: any = 0;
  middle: any = 0;
  end: any = 0;
  uuid: any = "";
  ssr: any = typeof window === "undefined";
  debounced: any;
  state: ClampLinesState = {
    expanded: true,
    noClamp: false,
    text: "",
  };
  clientHeight:number;
  mounted = true;
  constructor(props: any) {
    super(props);
    this.element = null;
    this.original = props.text;
    this.watch = true;
    this.lineHeight = 0;
    this.start = 0;
    this.middle = 0;
    this.end = 0;
    this.uuid = props.id;
    this.state = {
      expanded: true,
      noClamp: false,
      text: props.text.substring(0, 1),
    };
    this.clientHeight = 0;
    this.mounted = true;
    // If window is undefined it means the code is executed server-side
    this.ssr = typeof window === "undefined";

    this.action = this.action.bind(this);
    this.clickHandler = this.clickHandler.bind(this);

    if (!this.ssr) {
      this.debounced = debounce(this.action, props.delay);
    } else {
      this.state.text = props.text.substring(0, 20);
    }
  }

  componentDidMount() {
    if (!this.ssr) {
      if (this.element) this.lineHeight = this.element.clientHeight;
      this.setState({
        text: this.props.text.substring(0, 20),
      });
      this.clampLines();
      if (this.watch) {
        window.addEventListener("resize", this.debounced);
      }
      if (this.props.customOnChange) this.props.customOnChange(this.state);
    }
  }

  componentWillUnmount() {
    if (!this.ssr) {
      this.mounted = false;
      window.removeEventListener("resize", this.debounced);
    }
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.text !== this.props.text) {
      this.original = this.props.text;
      this.clampLines();
    }
    if (this.props.customOnChange) this.props.customOnChange(this.state);
  }

  action() {
    if (this.watch && this.mounted) {
      this.setState({
        noClamp: false,
      });
      const newState = this.clampLines();
      if (newState && newState.noClamp)
        this.setState({ expanded: !newState.noClamp });
    }
  }

  clampLines() {
    if (!this.element) return;
    if (this.props.lines === undefined) return;
    this.setState({
      text: "",
    });
    let maxHeight = this.lineHeight * this.props.lines;
    this.start = 0;
    this.middle = 0;
    this.end = this.original.length;
    while (this.start <= this.end) {
      this.middle = Math.floor((this.start + this.end) / 2);
      this.element.innerText = this.original.slice(0, this.middle);
      if (this.middle === this.original.length) {
        this.setState({
          text: this.original,
          noClamp: true,
        });
        return {
          text: this.original,
          noClamp: true,
        };
      }
      this.moveMarkers(maxHeight);
    }
    if(this.element.clientHeight > maxHeight) this.middle = this.middle - 1
    // const ellipsis = this.getEllipsis();
    // const ellipsisLen = ellipsis ? ellipsis.length : 0;
    // const btnText = this.props.moreText ? this.props.moreText.length : 0;
    const lengthOfClampedText = this.middle;

    this.element.innerText = this.original.slice(
      0,
      lengthOfClampedText > 4 ? lengthOfClampedText : 5
    );

    this.setState({
      text: this.element.innerText,
    });

    return {
      text: this.element.innerText,
      noClamp: false,
    };
  }

  moveMarkers(maxHeight: any) {
    if (this.element.clientHeight <= maxHeight) {
      this.start = this.middle + 1;
    } else {
      this.end = this.middle - 1;
    }
  }

  getClassName() {
    let className = this.props.className || "";

    return `clamp-lines ${className}`;
  }

  getEllipsis() {
    return this.watch && !this.state.noClamp ? this.props.ellipsis : "";
  }

  getButton() {
    if (this.state.noClamp || !this.props.buttons) return;

    let buttonText = this.watch ? this.props.moreText : this.props.lessText;

    return (
      <button
        className="clamp-lines__button"
        onClick={this.clickHandler}
        aria-controls={`clamped-content-${this.uuid}`}
        aria-expanded={!this.state.expanded}
        style={this.props.btnStyles}
      >
        {buttonText}
      </button>
    );
  }

  clickHandler(e: any) {
    const { stopPropagation } = this.props;

    e.preventDefault();
    stopPropagation && e.stopPropagation();
    this.watch = !this.state.expanded;
    if (!this.state.expanded) this.clampLines();
    else
      this.setState({
        text: this.original,
      });
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    if (!this.props.text) {
      return null;
    }
    if (!this.props.innerElement) return null;
    const innerClampElement = React.createElement(
      this.props.innerElement,
      {
        ref: (e) => {
          this.element = e;
        },
        id: `clamped-content-${this.uuid}`,
        "aria-hidden": this.state.expanded,
        style: this.props.styles,
        className: "clampLines_content",
      },
      this.state.text
    );
    const ellipsisElement = (
      <div className="clampLines_ellipsis">{this.getEllipsis()}</div>
    );
    return (
      <div className={this.getClassName()}>
        {innerClampElement}
        {this.state.expanded ? ellipsisElement : null}
        {this.getButton()}
      </div>
    );
  }
}
ClampLines.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
  lines: PropTypes.number,
  ellipsis: PropTypes.string,
  buttons: PropTypes.bool,
  moreText: PropTypes.string,
  lessText: PropTypes.string,
  className: PropTypes.string,
  delay: PropTypes.number,
  stopPropagation: PropTypes.bool,
  innerElement: PropTypes.string,
};
ClampLines.defaultProps = {
  lines: 3,
  ellipsis: "...",
  buttons: true,
  moreText: "Read more",
  lessText: "Read less",
  delay: 500,
  innerElement: "div",
};
