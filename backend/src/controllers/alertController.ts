import { Request, Response } from 'express';

export const getAlerts = async (req: Request, res: Response): Promise<void> => {
  const city = (req.query.city as string) || 'All';
  
  const sampleAlerts = [
    {
      id: 'alt_1',
      title: 'Heavy Rainfall Warning',
      severity: 'High',
      type: 'Heavy Rain',
      description: 'Convective cloud build-up expected to yield intense localized downpours (25-40 mm/hr).',
      location: 'Bangalore, India',
      startTime: new Date(Date.now() + 3600000).toISOString(),
      expectedDuration: '4 Hours',
      active: true
    },
    {
      id: 'alt_2',
      title: 'High Temperature Advisory',
      severity: 'Moderate',
      type: 'Extreme Heat',
      description: 'Afternoon heat index expected to touch 36°C with elevated solar UV exposure.',
      location: 'Delhi, India',
      startTime: new Date().toISOString(),
      expectedDuration: '6 Hours',
      active: true
    },
    {
      id: 'alt_3',
      title: 'Gale Wind Gust Alert',
      severity: 'Extreme',
      type: 'Strong Wind',
      description: 'Barometric dip inducing coastal squall gusts in excess of 60 km/h.',
      location: 'Mumbai, India',
      startTime: new Date(Date.now() - 7200000).toISOString(),
      expectedDuration: '12 Hours',
      active: true
    }
  ];

  res.json({
    success: true,
    alerts: sampleAlerts
  });
};

export const updateAlertPreferences = async (req: Request, res: Response): Promise<void> => {
  res.json({
    success: true,
    message: 'Alert preferences updated successfully.',
    preferences: req.body
  });
};
