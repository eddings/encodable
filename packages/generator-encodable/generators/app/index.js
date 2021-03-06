/* eslint-disable sort-keys */

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the rad ${chalk.red('generator-encodable')} generator!`));

    this.option('skipInstall');

    this.answers = await this.prompt([
      {
        type: 'list',
        name: 'subgenerator',
        message: 'What do you want to do?',
        choices: [
          {
            name: 'Create encodable core package',
            value: 'package',
          },
        ],
      },
    ]);
  }

  configuring() {
    // Redirect the default 'app' generator
    // to 'package' subgenerator
    // until there are multiple subgenerators
    // then this can be changed into a menu to select
    // subgenerator.
    this.composeWith(require.resolve(`../${this.answers.subgenerator}`));
  }
};
