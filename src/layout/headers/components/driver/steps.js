export const steps = (t) => [
  {
    element: '#guide',
    popover: {
      title: t('driver.guideBtn'),
      description: 'Body of the popover',
      position: 'left'
    }
  },
  {
    element: '#hamburger',
    popover: {
      title: t('driver.hamburgerBtn'),
      description: 'Body of the popover',
      position: 'bottom'
    }
  },
  {
    element: '#screenFull',
    popover: {
      title: t('driver.fullScreen'),
      description: 'Body of the popover',
      position: 'left'
    }
  }
]
