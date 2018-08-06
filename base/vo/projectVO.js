const render = project => {
  return {
    projectCode: project.projectCode,
    projectName: project.projectName,
    projectNote: project.projectNote,
    telegramJoinLink: project.telegramJoinLink
  }
}

module.exports.render = render