check_primary_monitor () {
  local monitor_name=$(xrandr -q | grep -e " connected [primary]" )
  if [[ -z "$monitor_name" ]]; then
    return 0
  else
    return 1
  fi
}

get_primary_monitor_name () {
    local xmain_monitor_name
    if ! check_primary_monitor; then
        xmain_monitor_name=$(xrandr -q | grep " connected [primary]" | cut -d ' ' -f 1)
        echo "$xmain_monitor_name"
   fi
}

get_monitor_name () {
  local xmonitor_name
    if check_primary_monitor; then
        xmonitor_name=$(xrandr -q | grep " connected [^primary]" | cut -d ' ' -f 1)
        echo "$xmonitor_name"
    fi
}

get_monitor_resolution () {
  local monitor_name="$1"

  if check_primary_monitor; then
    resolution=$(xrandr -q | grep "$monitor_name connected [^primary]" | cut -d ' ' -f 4 | cut -d "+" -f 1)
  else
    resolution=$(xrandr -q | grep "$monitor_name connected [^primary]" | cut -d ' ' -f 3 | cut -d "+" -f 1)
  fi

echo $resolution
}

get_monitor_specs () {
  local xrandr_output=()
  local xrandr_line
  local xmonitor_specs
  local xmonitor_matrix=()

  if check_primary_monitor; then
    readarray -t xrandr_output < <(xrandr -q | grep " connected [^primary]")

    for xrandr_line in "${xrandr_output[@]}"; do
      xmonitor_specs=$(echo "$xrandr_line" | awk '{match($0, /^([^ ]+) ([0-9]+)x/); print $1, $2}')
      echo "$xmonitor_specs"
      xmonitor_matrix+=("$xmonitor_specs")
    done
  fi
echo "${xmonitor_matrix[@]}"
}
