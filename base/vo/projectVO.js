const render = project => {
  return {
    projectCode: project.projectCode,
    projectName: project.projectName,
    projectNote: project.projectNote,
    projectLogoUrl: project.projectLogoUrl,
    project_text_logo_url: project.project_text_logo_url,
    telegramJoinLink: project.telegramJoinLink,
    platformLink: project.platformLink
  }
}

module.exports.render = render