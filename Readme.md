# component-score

Opinionated and subjective way of checking if a component is good enough to be used in your next
great project.

## Install

    npm install -g component-score

## Usage

To check a component:

    component score repo/name

For example:

    component-score code42day/plumper

      Total score: 66%
        ~ No demo page.
        ✓ all deps are pinned.
        ✓ all deps are current.

## Todo

More checks:
- component can actually be retrieved using its version tag
- tag version agrees with what in component.json
- pull requests are closed, looked at
- plays well with others (used in other component/is using other components)
- recursively check dependencies, aggregate the results
- unreleased version on top of master
- changelog present and current

Other:
- select checks from command line
- checks all the deps in component.json

## License

MIT
