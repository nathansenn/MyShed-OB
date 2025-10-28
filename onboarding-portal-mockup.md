# MyShed Onboarding Portal - UI Mockup

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ MyShed Admin                                           👤 Admin  🔔  ⚙️  │
└─────────────────────────────────────────────────────────────────────────────┘
┌──────────────────┬──────────────────────────────────────────────────────────┐
│                  │                                                          │
│  LEFT SIDEBAR    │              MAIN CONTENT AREA                           │
│  (Navigation)    │                                                          │
│                  │                                                          │
│                  │                                                          │
└──────────────────┴──────────────────────────────────────────────────────────┘
```

---

## Left Sidebar (Fixed Navigation)

```markdown
┌─────────────────────────────────────┐
│ 🏗️ Onboarding Portal                │
├─────────────────────────────────────┤
│                                     │
│ MyShed Client Onboarding Form       │
│ Northwood Outdoor                   │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Overall Progress                │ │
│ │ ████░░░░░░░░░░░░░░░░░░░░░░  1.2%│ │
│ │ 1 of 84 fields completed        │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [→ Go to Next Missing Section]     │
│                                     │
├─────────────────────────────────────┤
│ 📋 Sections                         │
├─────────────────────────────────────┤
│                                     │
│ ✓ Company Information        100%  │
│   ├─ Owner Name              ✓     │
│   ├─ Contact Number          ✓     │
│   ├─ Email Address           ✓     │
│   ├─ Website Link            ✓     │
│   └─ Full Address            ✓     │
│                                     │
│ ⚠️  Company Color Scheme       50%  │
│   ├─ Primary Color           ✓     │
│   └─ Secondary Color         ✗     │
│                                     │
│ ⚠️  A. Store Information       14%  │
│   ├─ Store 1: Hayward        ✓     │
│   ├─ Store 2: Fairmont       ⚠️    │
│   ├─ Store 3: Pine City      ⚠️    │
│   ├─ Store 4: Tampa          ⚠️    │
│   ├─ Store 5: Port Charlotte ⚠️    │
│   ├─ Store 6: Arcadia        ⚠️    │
│   └─ Store 7: Garrison       ⚠️    │
│                                     │
│ ⚠️  B. System Users            20%  │
│   ├─ Administrator           ✓     │
│   ├─ Salesperson             ✗     │
│   ├─ Sales Manager           ✗     │
│   ├─ Driver                  ✗     │
│   └─ Manufacturing           ✗     │
│                                     │
│ ⚠️  C. Building Styles         40%  │
│   ├─ Classic Shed            ✓     │
│   ├─ Cape Cod Shed           ✓     │
│   ├─ Villa Shed              ✓     │
│   ├─ Monterey Shed           ✓     │
│   ├─ Dutch Barn              ⚠️    │
│   ├─ Steel Garden Shed       ⚠️    │
│   ├─ Cape Cod Garage         ⚠️    │
│   ├─ Steel Garage            ⚠️    │
│   ├─ Cape Cod Cabin          ⚠️    │
│   └─ Bunkhouse               ⚠️    │
│                                     │
│ ✗  D. Roof Details              0%  │
│                                     │
│ ✗  E. Siding Details            0%  │
│                                     │
│ ✗  F. Trim Details              0%  │
│                                     │
│ ⚠️  G. Door Details             5%  │
│   └─ 1 of 19 doors configured      │
│                                     │
│ ⚠️  H. Window Details           8%  │
│   └─ 1 of 13 windows configured    │
│                                     │
│ ✗  I. Interior Options          0%  │
│                                     │
│ ✗  J. Porch Options             0%  │
│                                     │
│ ✗  K. Non-3D Options            0%  │
│                                     │
│ ✗  L. Company Details           0%  │
│                                     │
│ ✗  M. Sales Tax Information     0%  │
│                                     │
│ ✗  N. Delivery Options          0%  │
│                                     │
│ ✗  O. Financing Options         0%  │
│                                     │
│ ✗  P. Payment Information       0%  │
│                                     │
└─────────────────────────────────────┘
```

---

## Main Content Area - Example Views

### View 1: Building Styles Management

```markdown
┌──────────────────────────────────────────────────────────────────────────┐
│ C. Building Styles                                    [+ Add New Style]  │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│ 📊 Progress: 4 of 10 building styles fully configured (40%)             │
│                                                                          │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Building Style 1: Classic Shed                              ✓ 100% │ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │                                                                    │ │
│ │ Status: ✅ Complete                                   [Edit] [⋮]   │ │
│ │                                                                    │ │
│ │ 📦 Basic Information                                               │ │
│ │ ├─ Name: Classic Shed                                              │ │
│ │ ├─ MyShed Catalog Shortcode: CLASSIC                               │ │
│ │ │  [Linked to: Classic Gable Style] [Change Mapping]               │ │
│ │ └─ Description: Our classic storage shed offers great...           │ │
│ │                                                                    │ │
│ │ 🖼️  Product Images (4)                            [+ Add Image]     │ │
│ │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                               │ │
│ │ │ Main │ │Dormer│ │Vinyl │ │Inter.│                               │ │
│ │ │  🖼️  │ │  🖼️  │ │  🖼️  │ │  🖼️  │                               │ │
│ │ └──────┘ └──────┘ └──────┘ └──────┘                               │ │
│ │                                                                    │ │
│ │ 💰 Pricing Matrix (22 SKUs)                       [Edit Matrix]    │ │
│ │ ┌────────────────────────────────────────────────────────────┐    │ │
│ │ │ Size    Material    Base Price    Status                   │    │ │
│ │ ├────────────────────────────────────────────────────────────┤    │ │
│ │ │ 6x6     Wood        $3,695        ✓                        │    │ │
│ │ │ 6x6     Vinyl       $4,540        ✓                        │    │ │
│ │ │ 6x8     Wood        $3,995        ✓                        │    │ │
│ │ │ 6x8     Vinyl       $4,785        ✓                        │    │ │
│ │ │ ...     ...         ...           ...                      │    │ │
│ │ │ [View All 22 SKUs →]                                       │    │ │
│ │ └────────────────────────────────────────────────────────────┘    │ │
│ │                                                                    │ │
│ │ 🔧 Compatible Options                                              │ │
│ │ ├─ Doors: 5 types configured      [Configure →]                   │ │
│ │ ├─ Windows: 8 types configured    [Configure →]                   │ │
│ │ ├─ Roofing: 7 colors configured   [Configure →]                   │ │
│ │ └─ Siding: 13 colors configured   [Configure →]                   │ │
│ │                                                                    │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Building Style 2: Cape Cod Garden Shed ⭐                   ⚠️  75% │ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │                                                                    │ │
│ │ Status: ⚠️  Missing Door Configurations           [Edit] [⋮]       │ │
│ │                                                                    │ │
│ │ 📦 Basic Information                                               │ │
│ │ ├─ Name: Cape Cod Garden Shed                                     │ │
│ │ ├─ MyShed Catalog Shortcode: CAPECOD                              │ │
│ │ │  [Linked to: Garden Shed Style] [Change Mapping]                │ │
│ │ └─ Description: The Cape Cod Garden Shed has an...                │ │
│ │                                                                    │ │
│ │ 🖼️  Product Images (5)                            [+ Add Image]     │ │
│ │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                     │ │
│ │ │ Main │ │10x16 │ │12x30 │ │ 8x16 │ │Inter.│                     │ │
│ │ │  🖼️  │ │  🖼️  │ │  🖼️  │ │  🖼️  │ │  🖼️  │                     │ │
│ │ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘                     │ │
│ │                                                                    │ │
│ │ 💰 Pricing Matrix (30 SKUs)                       [Edit Matrix]    │ │
│ │ ✓ All pricing configured                                           │ │
│ │                                                                    │ │
│ │ 🔧 Compatible Options                                              │ │
│ │ ├─ Doors: ⚠️ 0 types configured   [Configure →]                   │ │
│ │ ├─ Windows: ✓ 8 types configured  [Configure →]                   │ │
│ │ ├─ Roofing: ✓ 7 colors configured [Configure →]                   │ │
│ │ └─ Siding: ✓ 13 colors configured [Configure →]                   │ │
│ │                                                                    │ │
│ │                           [Complete Configuration →]               │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Building Style 3: Villa Shed                                ⚠️  60% │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│ [Show More Styles ↓]                                                    │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

### View 2: Door Details with MyShed Catalog Linking

```markdown
┌──────────────────────────────────────────────────────────────────────────┐
│ G. Door Details                                       [+ Add New Door]   │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│ 📊 Progress: 1 of 19 doors fully configured (5%)                        │
│                                                                          │
│ 🔗 MyShed Catalog Integration                                           │
│ ├─ Total doors in MyShed catalog: 94                                    │
│ ├─ Linked doors: 19                                                     │
│ └─ Available to add: 75                              [Browse Catalog →] │
│                                                                          │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ 🚪 Door Configuration Table                                        │ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │                                                                    │ │
│ │ Filter: [All Doors ▾]  [Configured Only]  [Missing Config Only]   │ │
│ │ Search: [___________________] 🔍                                   │ │
│ │                                                                    │ │
│ │ ┌──────────────────────────────────────────────────────────────┐ │ │
│ │ │ # │ Image │ Northwood Name     │ MyShed Code │ Price │ Styles│ │ │
│ │ ├──────────────────────────────────────────────────────────────┤ │ │
│ │ │ 1 │  🖼️   │ Standard Double    │ STDD ✓      │ ⚠️    │ ⚠️   │ │ │
│ │ │   │       │ Door               │             │       │      │ │ │
│ │ │   │       │ [Edit Name]        │[Change Code]│[Set]  │[Set] │ │ │
│ │ ├──────────────────────────────────────────────────────────────┤ │ │
│ │ │ 2 │  ⚠️   │ Standard Double    │ STDDTW ✓    │ ✗     │ ✗   │ │ │
│ │ │   │       │ Doors w/ Transom   │             │       │      │ │ │
│ │ │   │       │ [Edit Name]        │[Change Code]│[Set]  │[Set] │ │ │
│ │ ├──────────────────────────────────────────────────────────────┤ │ │
│ │ │ 3 │  ⚠️   │ 9-Light Fiberglass │ 9LFWI ✓     │ ✗     │ ✗   │ │ │
│ │ │   │       │ Walk-in Door       │             │       │      │ │ │
│ │ │   │       │ [Edit Name]        │[Change Code]│[Set]  │[Set] │ │ │
│ │ ├──────────────────────────────────────────────────────────────┤ │ │
│ │ │ 4 │  ⚠️   │ Garden Barn Door   │ GBDT ✓      │ ✗     │ ✗   │ │ │
│ │ │   │       │ w/ Transom Window  │             │       │      │ │ │
│ │ │   │       │ [Edit Name]        │[Change Code]│[Set]  │[Set] │ │ │
│ │ ├──────────────────────────────────────────────────────────────┤ │ │
│ │ │...│  ...  │ ...                │ ...         │ ...   │ ... │ │ │
│ │ └──────────────────────────────────────────────────────────────┘ │ │
│ │                                                                    │ │
│ │ Showing 1-10 of 19 doors     [← Previous] [1] [2] [Next →]        │ │
│ │                                                                    │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ 🔍 Add Door from MyShed Catalog                                    │ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │                                                                    │ │
│ │ Browse 75 available doors in MyShed catalog:                       │ │
│ │                                                                    │ │
│ │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                     │ │
│ │ │4LITE │ │5LITE │ │DUTCH │ │RANCH │ │GLASS │                     │ │
│ │ │  🖼️  │ │  🖼️  │ │  🖼️  │ │  🖼️  │ │  🖼️  │                     │ │
│ │ │ [+]  │ │ [+]  │ │ [+]  │ │ [+]  │ │ [+]  │                     │ │
│ │ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘                     │ │
│ │                                                                    │ │
│ │                                    [Browse All Doors →]            │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

### View 3: Edit Door Modal/Panel

```markdown
┌──────────────────────────────────────────────────────────────────────────┐
│ ✏️  Edit Door Configuration                                       [✕]    │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│ Door #1: Standard Double Door                                            │
│                                                                          │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Basic Information                                                  │ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │                                                                    │ │
│ │ Northwood Display Name *                                           │ │
│ │ ┌────────────────────────────────────────────────────────┐         │ │
│ │ │ Standard Double Door                                   │         │ │
│ │ └────────────────────────────────────────────────────────┘         │ │
│ │                                                                    │ │
│ │ MyShed Catalog Shortcode *                                         │ │
│ │ ┌────────────────────┐                                             │ │
│ │ │ STDD          [▾]  │  [Change Mapping...]                        │ │
│ │ └────────────────────┘                                             │ │
│ │                                                                    │ │
│ │ Current MyShed Catalog Link:                                       │ │
│ │ ┌────────────────────────────────────────────────────────┐         │ │
│ │ │ 🖼️  Standard Double Door (STDD)                        │         │ │
│ │ │ Image: https://myshed.io/MyShed%20Web%20Catalog/       │         │ │
│ │ │        images/image208.png                             │         │ │
│ │ │                                                        │         │ │
│ │ │ [Preview Image]                                        │         │ │
│ │ └────────────────────────────────────────────────────────┘         │ │
│ │                                                                    │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Pricing Configuration                                              │ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │                                                                    │ │
│ │ Base Price                                                         │ │
│ │ ┌────────────────────┐                                             │ │
│ │ │ $                  │                                             │ │
│ │ └────────────────────┘                                             │ │
│ │                                                                    │ │
│ │ ☐ Price varies by building style                                  │ │
│ │ ☐ Price varies by building size                                   │
│ │                                                                    │ │
│ │ Additional Pricing                                                 │ │
│ │ ┌────────────────────────────────────────────────────────┐         │ │
│ │ │ Upgrade from standard door: +$200                      │         │ │
│ │ └────────────────────────────────────────────────────────┘         │ │
│ │                                                                    │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Allowed Building Styles                                            │ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │                                                                    │ │
│ │ Select which building styles can use this door:                    │ │
│ │                                                                    │ │
│ │ ☑ Classic Shed                  ☑ Steel Garden Shed               │ │
│ │ ☑ Cape Cod Garden Shed          ☑ Cape Cod Garage                 │ │
│ │ ☑ Villa Shed                    ☑ Steel Garage                    │ │
│ │ ☑ Monterey Shed                 ☑ Cape Cod Cabin                  │ │
│ │ ☑ Dutch Barn                    ☑ Bunkhouse                       │ │
│ │                                                                    │ │
│ │ [☑ Select All]  [☐ Deselect All]                                  │ │
│ │                                                                    │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Standard vs. Upgrade                                               │ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │                                                                    │ │
│ │ ⚫ Standard door (included in base price)                          │ │
│ │ ⚪ Upgrade option (additional cost)                                │ │
│ │                                                                    │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│                                                                          │
│                           [Cancel]  [Save Changes]                       │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

### View 4: MyShed Catalog Browser

```markdown
┌──────────────────────────────────────────────────────────────────────────┐
│ 📚 MyShed Catalog Browser - Doors                                  [✕]   │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│ Filter by Category: [Doors ▾]     Search: [______________] 🔍           │
│                                                                          │
│ ┌─────────────┬─────────────┬─────────────┬─────────────┬────────────┐ │
│ │ Short Code  │ Short Code  │ Short Code  │ Short Code  │ Short Code │ │
│ │             │             │             │             │            │ │
│ │    🖼️       │    🖼️       │    🖼️       │    🖼️       │    🖼️      │ │
│ │             │             │             │             │            │ │
│ │ STDD        │ STDDTW      │ 9LFWI       │ GBDT        │ BARNSSD    │ │
│ │ Standard    │ Standard    │ 9-Light     │ Garden Barn │ Single     │ │
│ │ Double Door │ Double w/   │ Fiberglass  │ Door w/     │ Barn Door  │ │
│ │             │ Transom     │ Walk-in     │ Transom     │            │ │
│ │             │             │             │             │            │ │
│ │ ✅ Linked   │ ✅ Linked   │ ✅ Linked   │ ✅ Linked   │ ✅ Linked  │ │
│ │ [View]      │ [View]      │ [View]      │ [View]      │ [View]     │ │
│ └─────────────┴─────────────┴─────────────┴─────────────┴────────────┘ │
│                                                                          │
│ ┌─────────────┬─────────────┬─────────────┬─────────────┬────────────┐ │
│ │ 4LITE       │ 5LITE       │ DUTCHD      │ RANCHDOOR   │ GLASSDOOR  │ │
│ │             │             │             │             │            │ │
│ │    🖼️       │    🖼️       │    🖼️       │    🖼️       │    🖼️      │ │
│ │             │             │             │             │            │ │
│ │ 4 Lite      │ 5 Lite      │ Dutch Door  │ Ranch House │ Double     │ │
│ │ Pre-hung    │ Pre-hung    │             │ Door        │ Glass Door │ │
│ │ Door        │ Door        │             │             │            │ │
│ │             │             │             │             │            │ │
│ │ ⚪ Not      │ ⚪ Not      │ ⚪ Not      │ ⚪ Not      │ ⚪ Not     │ │
│ │   Linked   │   Linked   │   Linked   │   Linked   │   Linked  │ │
│ │ [+ Add]     │ [+ Add]     │ [+ Add]     │ [+ Add]     │ [+ Add]    │ │
│ └─────────────┴─────────────┴─────────────┴─────────────┴────────────┘ │
│                                                                          │
│ ┌─────────────┬─────────────┬─────────────┬─────────────┬────────────┐ │
│ │ DMD         │ CBMDOOR     │ FRENCHDOOR  │ OVERHEAD    │ RSD9x7     │ │
│ │             │             │             │             │            │ │
│ │    🖼️       │    🖼️       │    🖼️       │    🖼️       │    🖼️      │ │
│ │             │             │             │             │            │ │
│ │ Double      │ Metal Door  │ French Door │ Overhead    │ Residential│ │
│ │ Metal Door  │             │             │ Garage Door │ Garage 9x7 │ │
│ │             │             │             │             │            │ │
│ │             │             │             │             │            │ │
│ │ ⚪ Not      │ ⚪ Not      │ ⚪ Not      │ ✅ Linked   │ ✅ Linked  │ │
│ │   Linked   │   Linked   │   Linked   │ [View]      │ [View]     │ │
│ │ [+ Add]     │ [+ Add]     │ [+ Add]     │             │            │ │
│ └─────────────┴─────────────┴─────────────┴─────────────┴────────────┘ │
│                                                                          │
│ Showing 1-15 of 94 doors     [← Previous] [1] [2] [3]... [Next →]      │
│                                                                          │
│ 💡 Tip: Click [+ Add] to link a door to your Northwood configuration    │
│                                                                          │
│                                               [Close]                    │
└──────────────────────────────────────────────────────────────────────────┘
```

---

### View 5: Window Details (Similar Pattern)

```markdown
┌──────────────────────────────────────────────────────────────────────────┐
│ H. Window Details                                   [+ Add New Window]   │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│ 📊 Progress: 1 of 13 windows fully configured (8%)                      │
│                                                                          │
│ 🔗 MyShed Catalog Integration                                           │
│ ├─ Total windows in MyShed catalog: 67                                  │
│ ├─ Linked windows: 13                                                   │
│ └─ Available to add: 54                            [Browse Catalog →]   │
│                                                                          │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ 🪟 Window Configuration Table                                      │ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │                                                                    │ │
│ │ # │ Image │ Northwood Name     │ MyShed Code │ Price │ Styles    │ │
│ │ ├───────────────────────────────────────────────────────────────┤ │ │
│ │ 1 │  🖼️   │ 3×3 Slider Window  │ 3X3SW ✓     │ ✓     │ ✓        │ │
│ │   │       │ [Edit Name]        │[Change Code]│[Edit] │[Edit]    │ │
│ │ ├───────────────────────────────────────────────────────────────┤ │ │
│ │ 2 │  🖼️   │ 3x3 Grid Window    │ 3x3grid ✓   │ ⚠️    │ ⚠️       │ │
│ │   │       │ [Edit Name]        │[Change Code]│[Set]  │[Set]     │ │
│ │ ├───────────────────────────────────────────────────────────────┤ │ │
│ │ 3 │  🖼️   │ 2x3 Window         │ CB2X3W ✓    │ ✗     │ ✗        │ │
│ │   │       │ [Edit Name]        │[Change Code]│[Set]  │[Set]     │ │
│ │ ├───────────────────────────────────────────────────────────────┤ │ │
│ │ 4 │  🖼️   │ Transom Window     │ TRANSOM ✓   │ ✗     │ ✗        │ │
│ │   │       │ [Edit Name]        │[Change Code]│[Set]  │[Set]     │ │
│ │ ├───────────────────────────────────────────────────────────────┤ │ │
│ │...│  ...  │ ...                │ ...         │ ...   │ ...      │ │
│ │                                                                    │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

### View 6: Company Information (Completed Section)

```markdown
┌──────────────────────────────────────────────────────────────────────────┐
│ Company Information                                            ✅ 100%   │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Full Owner Name *                                                  │ │
│ │ ┌────────────────────────────────────────────────────────┐         │ │
│ │ │ Elvie Martin                                           │ ✅      │ │
│ │ └────────────────────────────────────────────────────────┘         │ │
│ │                                                                    │ │
│ │ Contact Number *                                                   │ │
│ │ ┌────────────────────────┐  ┌────────────────────────┐            │ │
│ │ │ (715) 634-7725         │  │ (715) 699-0732         │ ✅         │ │
│ │ │ Main Office            │  │ Mobile                 │            │ │
│ │ └────────────────────────┘  └────────────────────────┘            │ │
│ │                                                                    │ │
│ │ Email Address *                                                    │ │
│ │ ┌────────────────────────────────────────────────────────┐         │ │
│ │ │ info@northwoodoutdoor.com                              │ ✅      │ │
│ │ └────────────────────────────────────────────────────────┘         │ │
│ │ ┌────────────────────────────────────────────────────────┐         │ │
│ │ │ Elvie@northwoodoutdoor.com                             │ ✅      │ │
│ │ └────────────────────────────────────────────────────────┘         │ │
│ │                                                                    │ │
│ │ Website Link *                                                     │ │
│ │ ┌────────────────────────────────────────────────────────┐         │ │
│ │ │ www.northwoodoutdoor.com                               │ ✅      │ │
│ │ └────────────────────────────────────────────────────────┘         │ │
│ │                                                                    │ │
│ │ Full Address *                                                     │ │
│ │ ┌────────────────────────────────────────────────────────┐         │ │
│ │ │ 10463 State Road 27, Hayward, WI 54843                 │ ✅      │ │
│ │ └────────────────────────────────────────────────────────┘         │ │
│ │                                                                    │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│                                                         [Edit] [Next →]  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

### View 7: Dashboard/Overview

```markdown
┌──────────────────────────────────────────────────────────────────────────┐
│ 🎯 Onboarding Dashboard - Northwood Outdoor                             │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│ ┌──────────────────────────────────────────────────────────────────┐   │
│ │ 📊 Overall Progress                                              │   │
│ │                                                                  │   │
│ │      ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  8.3%      │   │
│ │                                                                  │   │
│ │      7 of 84 fields completed                                   │   │
│ │                                                                  │   │
│ │      Estimated time to complete: ~2 hours                       │   │
│ │                                                                  │   │
│ └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│ ┌──────────────────────────────────────────────────────────────────┐   │
│ │ ⚡ Quick Actions                                                 │   │
│ │                                                                  │   │
│ │ [→ Go to Next Missing Section]                                  │   │
│ │ [📥 Import from Spreadsheet]                                    │   │
│ │ [👁️  Preview Builder]                                           │   │
│ │ [📧 Save & Email Progress]                                      │   │
│ │                                                                  │   │
│ └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│ ┌──────────────────────────────────────────────────────────────────┐   │
│ │ 🚨 Critical Missing Items (3)                                    │   │
│ │                                                                  │   │
│ │ 1. Door pricing for 18 doors                 [Configure →]      │   │
│ │ 2. Window pricing for 12 windows             [Configure →]      │   │
│ │ 3. Stripe payment keys                       [Add Keys →]       │   │
│ │                                                                  │   │
│ └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│ ┌──────────────────────────────────────────────────────────────────┐   │
│ │ ✅ Completed Sections (2)                                        │   │
│ │                                                                  │   │
│ │ ✓ Company Information (5/5 fields)                              │   │
│ │ ✓ Store 1: Northwood Outdoor - Hayward (5/5 fields)             │   │
│ │                                                                  │   │
│ └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│ ┌──────────────────────────────────────────────────────────────────┐   │
│ │ ⚠️  In Progress Sections (8)                                     │   │
│ │                                                                  │   │
│ │ ⚠️  Company Color Scheme (1/2) - 50%         [Continue →]       │   │
│ │ ⚠️  Store Information (1/7 stores) - 14%     [Continue →]       │   │
│ │ ⚠️  Building Styles (4/10 complete) - 40%    [Continue →]       │   │
│ │ ⚠️  Door Details (1/19 configured) - 5%      [Continue →]       │   │
│ │ ⚠️  Window Details (1/13 configured) - 8%    [Continue →]       │   │
│ │ ...                                                              │   │
│ │                                                                  │   │
│ └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│ ┌──────────────────────────────────────────────────────────────────┐   │
│ │ ⚪ Not Started Sections (6)                                      │   │
│ │                                                                  │   │
│ │ ○ Roof Details                               [Start →]          │   │
│ │ ○ Siding Details                             [Start →]          │   │
│ │ ○ Sales Tax Information                      [Start →]          │   │
│ │ ○ Delivery Options                           [Start →]          │   │
│ │ ○ Financing Options                          [Start →]          │   │
│ │ ○ Payment Information                        [Start →]          │   │
│ │                                                                  │   │
│ └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Data Structure Examples

### Database Schema for Door/Window/Style Linking

```javascript
// Northwood Building Styles Table
{
  id: 1,
  client_id: "northwood_outdoor",
  name: "Classic Shed",
  myshed_catalog_code: "CLASSIC",
  description: "Our classic storage shed offers...",
  images: [
    "https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1587/...",
    "https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1584/...",
  ],
  status: "complete",
  progress_pct: 100
}

// Northwood Doors Table
{
  id: 1,
  client_id: "northwood_outdoor",
  name: "Standard Double Door",
  myshed_catalog_code: "STDD",
  myshed_catalog_image: "https://myshed.io/MyShed%20Web%20Catalog/images/image208.png",
  base_price: 250.00,
  pricing_type: "fixed",
  is_standard: true,
  allowed_styles: [1, 2, 3, 4, 5], // Building style IDs
  status: "complete",
  progress_pct: 100
}

// Northwood Windows Table
{
  id: 1,
  client_id: "northwood_outdoor",
  name: "3×3 Slider Window",
  myshed_catalog_code: "3X3SW",
  myshed_catalog_image: "https://myshed.io/MyShed%20Web%20Catalog/images/image75.png",
  base_price: 125.00,
  pricing_type: "fixed",
  is_standard: true,
  allowed_styles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  status: "complete",
  progress_pct: 100
}

// MyShed Catalog Reference Table (Read-only)
{
  id: 1,
  category: "doors",
  code: "STDD",
  name: "Standard Double Door",
  image_path: "MyShed Web Catalog/images/image208.png",
  image_url: "https://myshed.io/MyShed%20Web%20Catalog/images/image208.png"
}

// Building Style Pricing Matrix
{
  id: 1,
  building_style_id: 1,
  width: 6,
  depth: 6,
  material: "wood",
  base_price: 3695.00,
  sku: "CLASSIC-6x6-WOOD"
}

// Client Progress Tracking
{
  client_id: "northwood_outdoor",
  total_fields: 84,
  completed_fields: 7,
  progress_pct: 8.3,
  sections: {
    "company_information": { total: 5, completed: 5, pct: 100 },
    "color_scheme": { total: 2, completed: 1, pct: 50 },
    "store_information": { total: 35, completed: 5, pct: 14 },
    "building_styles": { total: 10, completed: 4, pct: 40 },
    "doors": { total: 19, completed: 1, pct: 5 },
    "windows": { total: 13, completed: 1, pct: 8 }
  }
}
```

---

## API Endpoints

```javascript
// Get all MyShed catalog items
GET /api/myshed-catalog/doors
GET /api/myshed-catalog/windows
GET /api/myshed-catalog/building-styles

// Get client onboarding data
GET /api/clients/northwood-outdoor/onboarding
GET /api/clients/northwood-outdoor/onboarding/progress
GET /api/clients/northwood-outdoor/onboarding/doors
GET /api/clients/northwood-outdoor/onboarding/windows
GET /api/clients/northwood-outdoor/onboarding/building-styles

// Update client configuration
PUT /api/clients/northwood-outdoor/doors/:id
POST /api/clients/northwood-outdoor/doors
DELETE /api/clients/northwood-outdoor/doors/:id

PUT /api/clients/northwood-outdoor/windows/:id
POST /api/clients/northwood-outdoor/windows
DELETE /api/clients/northwood-outdoor/windows/:id

// Link to MyShed catalog
POST /api/clients/northwood-outdoor/doors/:id/link-catalog
{
  "myshed_catalog_code": "STDD"
}

// Change catalog mapping
PUT /api/clients/northwood-outdoor/doors/:id/change-mapping
{
  "old_code": "STDD",
  "new_code": "STDDTW"
}

// Bulk import
POST /api/clients/northwood-outdoor/import
{
  "doors": [...],
  "windows": [...],
  "building_styles": [...]
}
```

---

## Features Summary

### ✅ Key Features

1. **Progress Tracking**
   - Real-time progress calculation
   - Section-level and field-level tracking
   - Visual progress bars and percentages
   - "Go to next missing section" quick nav

2. **MyShed Catalog Integration**
   - Browse entire MyShed catalog (94 doors, 67 windows, etc.)
   - Visual catalog browser with images
   - One-click linking to Northwood configuration
   - Change/update catalog mappings
   - All images served from myshed.io

3. **Flexible Configuration**
   - Add custom items beyond catalog
   - Edit names while keeping catalog link
   - Change shortcode mappings
   - Set pricing per item
   - Configure allowed building styles per item

4. **Data Management**
   - Auto-populate from Northwood data
   - Bulk import/export
   - Duplicate detection
   - Version history
   - Save progress at any time

5. **User Experience**
   - Left sidebar navigation with live progress
   - Collapsible sections
   - Visual status indicators (✅ ⚠️ ✗)
   - Search and filter
   - Preview builder integration
   - Mobile responsive

---

## Technical Notes

- **Database**: PostgreSQL with JSONB for flexible storage
- **Images**: All catalog images served from `https://myshed.io/MyShed%20Web%20Catalog/images/`
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + Prisma ORM
- **State Management**: React Query for server state
- **File Upload**: AWS S3 for client-uploaded images
- **Authentication**: JWT + Role-based access control

---

## Next Steps

1. Build database schema
2. Seed MyShed catalog data
3. Import Northwood data
4. Build UI components
5. Implement API endpoints
6. Add validation rules
7. Testing & QA
8. Deploy to staging

---

*End of Mockup*
