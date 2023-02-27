get_monitor_name () {
  local xmonitor_name
    if check_primary_monitor; then
        xmonitor_name=$(xrandr -q | grep " connected [^primary]" | cut -d ' ' -f 1)
        echo "$xmonitor_name"
    fi
}

json_config_dir="$HOME/Documents/dev/eye/bspwm_installer/wm_data/base_files"
json_monitor_schema=$(cat "$json_config_dir/monitors.json")

get_monitor_specs () {
  local xrandr_output=()
  local xrline
  local xmonitor_matrix=()
  local xmline
  local xmonitor_specs

  readarray -t xrandr_output < <(xrandr -q | grep " connected [^primary]")

    for xrline in "${xrandr_output[@]}"; do
      xmonitor_specs=$(echo "$xrline" | awk '{print $1; match($3,/^[[:digit:]]+x[[:digit:]]+/); print substr($3,RSTART,RLENGTH)}')
      xmonitor_matrix+=("$xmonitor_specs")
    done
 
 echo ${xmonitor_matrix[@]}

}

check_primary_monitor () {
  local monitor_name=$(xrandr -q | grep -e " connected [primary]" )
  if [[ -z "$monitor_name" ]]; then
    return 0
  else
    return 1
  fi
}

set