class Nodey {
  public _parent: Nodey
  public _children: Set<Nodey>
  static roots: Array<Nodey>

  constructor(parent = null){
    this._parent = parent
    this._children = new Set()

    if (this.isRoot) {
      Nodey.addRoot(this)
    }
  }

  public get isRoot():boolean {
    return !this._parent
  }

  public createChild():Nodey {
    let node: Nodey = new Nodey(this);
    this._children.add(node);

    return node;
  }

  public removeFromParent():void {
    this._parent._children.delete(this)
    this._parent = null;
  }

  public get size():number {
    let size:number = 0;
    this._children.forEach(node => {
      size += node.size
    })

    return size + 1
  }

  static addRoot(root:Nodey) {
    Nodey.roots = !Nodey.roots ? [root] : [...Nodey.roots, root]
  }
  static get size() {
    return Nodey.roots
      .map(root => root.size)
      .reduce((a, b) =>  a + b);
  }
}

export default Nodey;