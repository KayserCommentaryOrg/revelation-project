# Pinned toolchain for this 2017-era build (Rollup 0.51, Svelte 1, Babel 6).
# CircleCI used Node 16.14; current nixpkgs no longer ships Node 16, so pin
# the nixos-23.05 release, the last one that does.
#
#   nix-shell --run "npm ci && npm run vendor"
let
  pinned = fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/nixos-23.05.tar.gz";
  };
  pkgs = import pinned {
    # Node 16 is EOL; nixpkgs refuses it unless explicitly permitted.
    config.permittedInsecurePackages = [ "nodejs-16.20.2" ];
  };
in
pkgs.mkShell {
  packages = [ pkgs.nodejs_16 pkgs.rsync ];
}
