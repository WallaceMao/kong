const render = project => {
  return {
    projectCode: project.projectCode,
    projectName: project.projectName,
    projectNote: project.projectNote,
    projectLogoUrl: project.projectLogoUrl,
    projectTextLogoUrl: project.projectTextLogoUrl,
    telegramJoinLink: project.telegramJoinLink,
    platformLink: project.platformLink
  }
}

module.exports.render = render