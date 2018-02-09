import * as React from 'react';
import { CircularProgress } from 'material-ui/Progress';

export function loadingSpinner(is_loading, size=60, thickness=5) {
  return(is_loading ? <CircularProgress size={60} thickness={5} /> : null)
}