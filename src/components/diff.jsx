/**
 * Credits: https://github.com/cezary/react-diff
 *
 * Package is no longer maintained as of (28/10/2017)
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { diffChars, diffWords, diffWordsWithSpace, diffLines, diffTrimmedLines, diffSentences, diffCss, diffJson } from 'diff';

const fnMap = {
  chars: diffChars,
  words: diffWords,
  wordsWithSpace: diffWordsWithSpace,
  lines: diffLines,
  trimmedLines: diffTrimmedLines,
  sentences: diffSentences,
  css: diffCss,
  json: diffJson,
};

/**
 * Display diff in a stylable form.
 *
 * Default is character diff. Change with props.type. Valid values
 * are 'chars', 'words', 'sentences', 'json'.
 *
 *  - Wrapping div has class 'Difference', override with props.className
 *  - added parts are in <ins>
 *  - removed parts are in <del>
 *  - unchanged parts are in <span>
 */
class Diff extends React.Component {
  constructor() {
    super();
    this.displayName = 'Diff';
    this.state = {
      inputA: '',
      inputB: '',
      type: 'chars',
      className: 'difference',
    };
  }

  render() {
    const diff = fnMap[this.props.type](this.props.inputA, this.props.inputB, this.props.options);

    return _.map(diff, (part, index) => {
      const spanStyle = {
        backgroundColor: part.added ? 'lightgreen' :
          part.removed ? 'salmon' :
            'lightgrey',
      };

      return (<span key={index} style={spanStyle}>{part.value}</span>);
    });
  }
}

Diff.defaultProps = {
  inputA: '',
  inputB: '',
  type: 'chars',
  className: 'difference',
};

Diff.propTypes = {
  inputA: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  inputB: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  type: PropTypes.oneOf([
    'chars',
    'words',
    'wordsWithSpace',
    'lines',
    'trimmedLines',
    'sentences',
    'css',
    'json',
  ]),
  options: PropTypes.object,
};

export default Diff;
