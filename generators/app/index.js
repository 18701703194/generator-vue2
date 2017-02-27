/**
* API: http://yeoman.io/authoring/
*/
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
	// The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)

    this.props = {}
  }

  prompting() {
    const prompts = require('./prompts')(this)

    return this.prompt(prompts).then((props) => {
      this.props = props
    })
  }

  writing() {
    this.fs.copy(this.templatePath(), this.destinationPath())
    // reset package.json
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    )
  }
}