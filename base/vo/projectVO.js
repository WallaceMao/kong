const render = project => {
  return {
    id: project.id,
    projectCode: project.projectCode,
    projectName: project.projectName,
    projectNote: project.projectNote,
    telegramJoinLink: project.telegramJoinLink
  }
}

module.exports.render = render